class Api {
  constructor(options){
    this._url= options.baseUrl;
    this._headers= options.headers;
  }
  loadUserInfo(){
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject('Server error');
      }
      return res.json();
    }).then((data) => {
      return data;
    }).catch((err) => console.log(err));
  }
  updateUserInfo(obj){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.fullname,
        about: obj.job
      })
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject('Server error');
      }
      return res.json();
    }).then((data) => {
      return data;
    }).catch((err) => console.log(err));
  }
  updateAvatar(obj){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.avatarLink
      })
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject('Server error');
      }
      return res.json();
    }).then((data) => {
      return data;
    }).catch((err) => console.log(err));
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject('Server error');
      }
      return res.json();
    }).then((data) => {
      return data;
    }).catch((err) => console.log(err));
  }
  addCard(obj){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.elemTitle,
        link: obj.link
      })
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject('Server error');
      }
      return res.json();
    }).then((data) => {
      return data;
    }).catch((err) => console.log(err));
  }
  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject('Server error');
      }
      return res.json();
    }).then((data) => {
      return data;
    }).catch((err) => console.log(err));
  }
}
export default Api;
