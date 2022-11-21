import Head from 'next/head'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Artrypto</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className="text-center">
                    Welcome to Artrypto!
                </h1>
            </main>
        </div>
    )
}
