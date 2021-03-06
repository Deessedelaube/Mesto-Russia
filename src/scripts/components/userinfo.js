export default class UserInfo{
  constructor({nameSelector, infoSelector, avatarSelector, id}){
    this._name= document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
    this.id = id;
  }
  getUserInfo(){
    return {name: this._name.textContent,
            info: this._info.textContent,
            _id: this.id}
  }
  setUserInfo(obj){
    this._name.textContent = obj.fullname;
    this._info.textContent = obj.job;
    this.id = obj._id;
    if (obj.avatar){
      this.setAvatar(obj.avatar)
    };
  }
  setAvatar(link){
    this._avatar.src = link;
  }
}
