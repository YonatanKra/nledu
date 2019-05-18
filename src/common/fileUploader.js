const firebase = require('./firebase');

module.exports.uploadImage = async (path, imageFileDataURL) => {
    const ref = firebase.storage().ref().child(path);

    const result = await ref.putString(imageFileDataURL, 'data_url');

	return result;
};