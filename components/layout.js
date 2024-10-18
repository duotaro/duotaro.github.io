import Head from "next/head";
import Navbar from './navbar'
import Footer from './footer'
import { AnimatePresence } from 'framer-motion';
import UseScrollToTop from '../hooks/useScrollToTop';

export default function Layout({ children }) {
  return (
    <AnimatePresence>
      <Head>
        <meta name="description" content="TechnologyとConvenienceを組み合わせた造語。​ITがもたらす便利なものを紹介します。最近はAI関連の記事が多いです。ChatGPT / Google Bard / OpenAI GPT / Replika" />
        <meta property="og:image"  contents="https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501153944.jpg"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
			<div className=" bg-secondary-light dark:bg-primary-dark transition duration-300">
  
        <Navbar />
        <UseScrollToTop />
        <main>{children}</main>
        <UseScrollToTop />
        <Footer />
      </div>
    </AnimatePresence>
  )
}