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
          if(res.data.data.images){
            data.data.images = res.data.data.images;
          }else{
            data.data.images = [0,0,0];
          }
            data.data.images[X] = data.data.images[X] + 1;
            axios
                .patch('https://mongocabal.herokuapp.com/api/v1/users', data)
        });
        console.log(data)
}

module.exports = updateNotification;