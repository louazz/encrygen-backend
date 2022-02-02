const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Profiles = mongoose.model('Profiles');
const Users = mongoose.model('Users');
router.post('/', auth.required, async (req, res, next) => {

  const { body: { profile } } = req;


  const finalProfile = new Profiles(profile);
 const  user= await Users.findOneAndUpdate({_id: profile.user},{
  hasprofile: true
})
  console.log(user)
  

return finalProfile.save()
  .then(() => res.json({ profile: finalProfile }));
});

router.patch('/update/:id', auth.required, async(req, res, next) => {
 const id= req.params.id;
  const { body: { profile } } = req;

console.log(profile)
 try{
let Fprofile=  await   Profiles.findOneAndUpdate({
          user: id,
      },

        profile

      )
      console.log(Fprofile)
}
catch(e){
  return res.status(401).json({message: e.message});
}
return  res.json({ id: id });
});

router.get('/show/:id', auth.required, async(req, res, next) => {
  var  id  = req.params.id;
  let Fprofile=null
  try{
   Fprofile=  await Profiles.findOne({
          user: id
      }
  )

}
  catch(e){
  return   res.status(401).json({message: e.message});
  }
return res.json(Fprofile);

});


module.exports = router;
