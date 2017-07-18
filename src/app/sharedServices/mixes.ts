/**
 * Created by Nir Mekin on 7/18/2017.
 */
export class MixesModule {

  constructor(
    public songs: [number],
    public userid:number,
    public mixid:number,
    public mixname:string,
    public likes: number,
    public heard: number,
    public comments:[string],
    public hashtags:[string]
  ){}

}
