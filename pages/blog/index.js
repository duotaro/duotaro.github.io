import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../../lib/notion";
import { Text } from "./detail/[id].js";
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Blog({ posts }) {
    // genre filter

    //const searchParams = useSearchParams();

    //const tag = searchParams.get('tag');

    //const { tag } = router.query

    
    const router = useRouter();
    //const query = router.query;

    useEffect(() => {
      console.log(router)
      if(router.isReady) console.log(router.query);
    },[router]);

    //console.log(posts)
    //if(router.query){
    //  console.log(router.query)  
    //}
    // useEffect(async () => {
      
      let tag = ""
      let postList = posts
      if(tag && tag.length){
      
        for(const post of posts) {
          if(!post){
            continue
          }
      
          if(post.properties.Tags && post.properties.Tags.multi_select){
            for(const t of post.properties.Tags.multi_select){
              if(!t){
                continue
              }
              if(tag == t.name){
                postList.push(post)
                break;
              }
            }
          }
        }
      }
    // }, [router, posts])
  
  



  return (
    <Layout>
      {/* nothing */}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
