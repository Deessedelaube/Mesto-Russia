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
        throw new Error(`'Server error: ',${res.status}`);
      }
      return res.json();
    })
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
        throw new Error(`'Server error: ',${res.status}`);
      }
      return res.json();
    });
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
        throw new Error(`'Server error: ',${res.status}`);
      }
      return res.json();
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`'Server error: ',${res.status}`);
      }
      return res.json();
    });
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
        throw new Error(`'Server error: ',${res.status}`);
      }
      return res.json();
    });
  }

  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`'Server error: ',${res.status}`);
      }
      return res.ok;
    });
  }

  likeCard(id, method){
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: `${method}`,
      headers: this._headers
    }).then((res) => {
      if (!res.ok) {
        return reject(new Error(`'Server error: ',${res.status}`));
      }
      return res.json();
    });
  }
}
export default Api;
