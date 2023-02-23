import { Optional } from "../helpers/optional";
import { findByEntryTitle, findEntryById, insertEntrie } from "../queries/entries";
import { insertTagsIntoEntry } from "../queries/entriesCategories";
import { checkUserExist } from "../queries/users";
import { CreateEntryValidations, Entrie, InsertEntrie } from "../interfaces/entry";

export const createNewEntrie = async ({ 
        title,
        cover_url,
        rating,
        synopsis,
        review,
        author
    }: InsertEntrie, tags: number[] ):Promise<CreateEntryValidations> => {
    
    //Check title
    const existTitle = await findByEntryTitle(title);
    if ( existTitle ) return 'ENTRY_TITLE_ALREADY_EXIST';

    //Check author
    const existsUser = await checkUserExist('id', author);
    if( !existsUser ) return 'ENTRY_INVALID_AUTHOR_ID';

    // const resultCreateEntry = Promise.all([
    //     insertEntrie({title, cover_url, rating, synopsis, review, author}), 
    //     insertTagsIntoEntry(tags)
    // ]);
    
    // try {
    //     await resultCreateEntry;
    // } catch (error) {
    //     console.log(error);
    //     return 'ENTRY_CREATION_SERVER_ERROR'
    // }

    //Insert into the database
    await insertEntrie({title, cover_url, rating, synopsis, review, author});
    //Insert tags into the last post
    await insertTagsIntoEntry(tags);
    
    return 'ENTRY_CREATED';        
}

// export const findEntry = async ( id:string ):Promise<Entrie | EntryNotFound> => {
//      const entry = await findEntryById(id);

//      if(!entry) return 'ENTRY_NOT_FOUND';

//      return entry;
// } 

export const findEntry = async ( id:string ) => {
    const entry = Optional.of<Entrie>( await findEntryById(id) );
    console.log(entry);
    return entry.get();
} 

