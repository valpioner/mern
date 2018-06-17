const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// UserMap model
const Post = require('../../models/UserMap');

// @route   GET api/map/test
// @desc    Tests map route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Map route Worksss"}));

// @route   GET api/map/:user_id
// @desc    Get post by user ID
// @access  Public
router.get('/:user_id',  (req, res) => {
    const errors = {};

    UserMap.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(map => {
        if (!map) {
          errors.nomap = 'There is no map for this user';
          res.status(404).json(errors);
        }

        res.json(map);
      })
      .catch(err => 
        res.status(404).json({map: 'There is no map for this user'})
      );
  }
);

// @route   POST api/map
// @desc    Create empty user map
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//   const { errors, isValid } = validatePostInput(req.body);

//   // Check Validation
//   if (!isValid) {
//     // If any errors, send 400 with errors object
//     return res.status(400).json(errors);
  //   }
  const newUserMap = new UserMap({
    user: req.user.id,
    flights: [
      [
        { lat: 50.448853, long: 30.513346 },
        { lat: 52.374355, long: 4.897960 },
        { lat: 40.785091, long: -73.968285 },
        { lat: 44.970697, long: -93.2614785 },
        { lat: 61.217381, long: -149.863129 },
        { lat: 37.774929, long: -122.41941 }
      ],
      [
        { lat: 34.0204989, long: -118.4117325 },
        { lat: 40.785091, long: -73.968285 },
        { lat: 48.858093, long: 2.294694 },
        { lat: 50.448853, long: 30.513346 }
      ],
      [
        { lat: 50.064650, long: 19.944979 },
        { lat: 59.924484, long: 10.705147 },
        { lat: 45.444958, long: 12.328463 }
      ],
      [
        { lat: 50.448853, long: 30.513346 },
        { lat: 41.015137, long: 28.979530 },
        { lat: 13.736717, long: 100.523186 },
        { lat: 10.762622, long: 106.660172 }
      ],
      [
        { lat: 50.4021702, long: 30.3926088 },
        { lat: 27.1927403, long: 33.6416265 }
      ],
      [
        { lat: 50.4021702, long: 30.3926088 },
        { lat: 34.9014389, long: 33.5852154 }
      ],
      [
        { lat: 49.8327787, long: 23.9421962 },
        { lat: 36.8980543, long: 30.6480653 }
      ],
      [
        { lat: 50.4021702, long: 30.3926088 },
        { lat: 52.3547322, long: 4.8285837 },
        { lat: 63.269458, long: 10.739231 }
      ]
    ]
  });

  newUserMap.save().then(userMap => res.json(userMap));
});

// @route   DELETE api/map/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({notauthorized: 'User not authorized'});
          }
          // Delete
          post.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    })
});

// @route   POST api/map/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({alreadyliked: 'User already liked this post'});
          }

          // Add user id to likes array
          post.likes.unshift({user: req.user.id});

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    })
});

// @route   POST api/map/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({notliked: 'You have not yet liked this post'});
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    })
});

module.exports = router;