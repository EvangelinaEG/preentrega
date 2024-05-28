import bcrypt from 'bcrypt'

 export const createhash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

 export const isValidPAssword = (password, usuario) => bcrypt.compareSync(password, usuario.password)

