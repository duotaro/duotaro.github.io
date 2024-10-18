import Head from "next/head.js";
import Link from "next/link.js";
import { getDatabase } from "../lib/notion.js";
import Layout from '../components/layout.js'
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
import { GENRE_LIST, GENRES } from "../const/index.js";
import AppBanner from "../components/parts/home/appBanner.js";
import { ProjectsProvider } from "../context/ProjectsContext.jsx";
import ProjectsGrid from "../components/projects/ProjectsGrid.jsx";
import Button from "../components/parts/reusable/button.js";

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

export default function Home({ }) {
  const tagList = getCategoryList(GENRE_LIST)
  return (
    <Layout>
      <Head>
        <title>Techvenience -  -</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
         <AppBanner />

         <ProjectsProvider tagList={tagList}>
				   <ProjectsGrid></ProjectsGrid>
			   </ProjectsProvider>

         <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              href={`/projects`}
              className="font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
              aria-label="More Projects"
            >
              <Button title="More Projects" />
            </Link>
          </div>
        
      </div>{/* .container */}
    </Layout>
  );
}

// export const getStaticProps = async () => {
//   const database = await getDatabase(databaseId);
//   database.reverse();
//   return {
//     props: {
//       posts: database
//     },
//     revalidate: 1,
//   };
// };


const getCategoryList = (posts) => {

  let tagList = []
  let tagNameList = []
  
  posts.map((tag) => {
    if(tag.name == 'Home'){
      return false;
    }
    if(tagNameList.indexOf(tag.name) < 0){
      tagList.push(tag)
      tagNameList.push(tag.name)
    }
  })
  return tagList
}