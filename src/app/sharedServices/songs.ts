/**
 * Created by Nir Mekin on 7/18/2017.
 */
export class SongssModule {

  constructor(
    public title: string,
    public artist:string,
    public id:number,
    public duration:number,
    public cover: string,
    public genre: string
  ){}

}
