/**
 * Created by PhpStorm.
 * Author: johnnyzhang
 * Date: 2018/11/26 6:04 PM
 */
// constants/user.js
class users {
    constructor(user_name){
        this.user_name = user_name
    }
    getName(){
        return `user name is '${this.user_name}' `;
    }
    static getUsers() {
        return ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
    }
}
export default users;