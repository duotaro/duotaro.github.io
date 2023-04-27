import Head from "next/head";
import Link from "next/link";
import Layout from '../../components/layout'
import styles from "../index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function About({  }) {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
        <p>
          <Link href={`/`}>
            home
          </Link>
          <Link href={`/blog/`}>
            blog
          </Link>
          <Link href={`/about/`}>
            about
          </Link>
        </p>
      </Head>

      <main className={styles.container}>
        about
      </main>
    </Layout>
  );
}