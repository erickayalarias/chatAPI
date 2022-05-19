const axios = require('axios');

function  updateNotification(publikKey,X) {
    const data = {
        uid: publikKey,
        publicKey: publikKey,
        data: {
        images: [],
        },
  };
  console.log(data)
    axios
        .post('https://mongocabal.herokuapp.com/api/v1/finduser', {
            uid: publikKey,
            publicKey: publikKey,
        })
      .then((res) => {
          console.log("entra")
          if(!res.data.data.images.includes(null) || res.data.data.images.length > 2){
            data.data.images = res.data.data.images;
          }else{
            data.data.images = [0,0,0];
          }
            data.data.images[X] = data.data.images[X] + 1;
            axios
            .patch('https://mongocabal.herokuapp.com/api/v1/users', data)
          .then((res)=> console.log(res.data.data.images))
        });
 
}

module.exports = updateNotification;