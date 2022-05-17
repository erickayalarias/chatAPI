const axios = require('axios');

function  updateNotification(publikKey,X) {
    const data = {
        uid: publikKey,
        publicKey: publikKey,
        data: {
        images: [],
        },
    };
    axios
        .post('http://localhost:4000/api/v1/finduser', {
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
                .patch('http://localhost:4000/api/v1/users', data)
        });
}

module.exports = updateNotification;