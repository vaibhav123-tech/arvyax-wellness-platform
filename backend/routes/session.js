const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const Session = require('../models/Session'); 

router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ msg: 'Session not found' });
    }
    res.json(session);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/my-sessions', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/save-draft', auth, async (req, res) => {
  const { title, tags, json_file_url, sessionId,image_url } = req.body;

  const sessionFields = { user: req.user.id, title, tags, json_file_url, status: 'draft',image_url };

  try {
    let session;
    if (sessionId) {
      session = await Session.findById(sessionId);
      if (!session) return res.status(404).json({ msg: 'Session not found' });

      if (session.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      session = await Session.findByIdAndUpdate(
        sessionId,
        { $set: sessionFields },
        { new: true }
      );
    } else {
      session = new Session(sessionFields);
      await session.save();
    }
    
    res.status(201).json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/my-sessions/:id', auth, async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ msg: 'Session not found' });
        }

        // Make sure the user owns the session
        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(session);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/publish', auth, async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ msg: 'Session ID is required' });
    }

    try {
        let session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({ msg: 'Session not found' });

        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        session.status = 'published';
        await session.save();

        res.json(session);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/my-sessions/:id', auth, async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ msg: 'Session not found' });
        }

        // Make sure user owns the session
        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await session.deleteOne();

        res.json({ msg: 'Session removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;