import Document, {
    DocumentContext,
    DocumentInitialProps,
    Html, Head, Main, NextScript
} from 'next/document';

class MyDocument extends Document {
    // static async getInitialProps(
    //     ctx: DocumentContext
    // ): Promise<DocumentInitialProps> {
    //     const initialProps = await Document.getInitialProps(ctx);

    //     return initialProps;
    // }
    render() {
        return (
            <Html>
                <Head>
                    <meta name="author" content="Eric Echemane" />
                    <link rel="author" href="https://github.com/ericechemane" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;