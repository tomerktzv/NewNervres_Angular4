/**
 * Created by Nir Mekin on 7/18/2017.
 */
export class SongssModule {

  constructor(
    public artist:string,
    public cover: string,
    public duration:number,
    public genre: string,
    public id:number,
    public title: string
  ){}

}
