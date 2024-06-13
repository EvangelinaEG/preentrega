import bcrypt from 'bcrypt'

 export const createhash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

 export const isValidPAssword = (user, password) => bcrypt.compareSync(password, user.password)

