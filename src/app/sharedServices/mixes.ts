/**
 * Created by Nir Mekin on 7/18/2017.
 */


export class MixesModule {

  constructor(
    public songs: [number],
    public username:string,
    public mixcover:string,
    public mixname:string,
    public likes: number,
    public heard: number,
    public comments:[string],
    public hashtags:[string]
  ){}

}
export class MixesModuleNew{
  constructor(
    public username:string,
    public mixcover:string,
    public mixname:string
  ){}
}
