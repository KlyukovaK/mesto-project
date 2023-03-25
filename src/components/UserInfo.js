export default class UserInfo {
    constructor({ profileTitle, profileAbout, profileAvatar }) {
        this._profileTitle = profileTitle;
        this._profileAbout = profileAbout;
        this._profileAvatar = profileAvatar;
        this._name = document.querySelector(profileTitle);
        this._about = document.querySelector(profileAbout);
        this._avatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        }
    }

    setUserInfo(data) {
        this.userId = data._id;
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._avatar.src = data.avatar;
    }
}
