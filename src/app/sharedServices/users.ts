/**
 * Created by Nir Mekin on 7/18/2017.
 */
export class UsersModule {

  constructor(
    public name: string,
    public username:string,
    public profilepic:string,
    public about:string,
    public address:string,
    public userpassword:string
  ){}
}
