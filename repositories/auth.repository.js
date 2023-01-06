

class AuthRepository {
  constructor(Model) {
    this.Model = Model;
  }

  findByNickname = async (nickname) => {
    const userNickname = await this.Model.findAll({ where: { nickname: nickname }});    
    return userNickname;

    // const a = await this.Model.findById({})
  };

  findById = async (userId) => {
    const user = await this.Model.findAll({ where: { id: userId } });
    // findByPk(userId);
    return user;
  };

  createUser = async (
    nickname, 
    password,     
    email, 
    phoneNumber, 
    admin
  ) => {
    const userData = await this.Model.create({
      nickname, 
      password,       
      email, 
      phoneNumber, 
      admin
  });
    return userData.dataValues.id;
  }

  }


module.exports = AuthRepository;



// export async function createUser(user) {
//   return user.create(user).then((data) => data.dataValues.id)
// }

// // 1. createUser

// // return에 유저의 id값이 되도록

// export async function findById(id){
//   return user.findByPk(id);
// }

// // 2. findByUserId


// export async function findByUsername(username) {
//   return User.findOne( { where : {username} } )
// }

// // 3. findByNickname