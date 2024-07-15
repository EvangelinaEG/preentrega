import bcrypt from 'bcrypt'

 export const createhash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

 export const isValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
  };
