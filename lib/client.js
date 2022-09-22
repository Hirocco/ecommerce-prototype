/**
 * For sanity client
 * Podlaczam sie do bazy sanity aby zyskac dostep do utworzonych tam produktow,
 */

import SanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


export const client = SanityClient({
    projectId:'dnefqfit',   //sanity manage -> productID
    dataset: 'production',  //sanity manage-> Datasets
    apiVersion:'2022-09-20',    //po prostu data kiedy fetchowalem
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client) //podlaczam builder do clienta aby miec dostep do produktow

export const urlFor = (source) => builder.image(source);   //wysyla url zdjec jakie mam zaloczone testowo w sanity manager