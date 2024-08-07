## Next.js サブスクリプション支払い スターターキット

これは高パフォーマンスな SaaS アプリケーションを構築するためのオールインワン スターター キットです。

## 機能

- Supabase を使用したセキュアなユーザー管理と認証 ([Supabase](https://supabase.io/docs/guides/auth))
- PostgreSQL 上に構築された Supabase を使った強力なデータアクセス & 管理ツール ([Supabase](https://supabase.io/docs/guides/database))
- Stripe Checkout と Stripe カスタマーポータルの統合 ([Stripe Checkout](https://stripe.com/docs/payments/checkout), [Stripe customer portal](https://stripe.com/docs/billing/subscriptions/customer-portal))
- Stripe Webhook による自動的な料金プランとサブスクリプションステータスの同期 ([Stripe Webhook](https://stripe.com/docs/webhooks))

## デモ

- [https://subscription-payments.vercel.app/](https://subscription-payments.vercel.app/)

[デモのスクリーンショット](./public/demo.png)

## アーキテクチャ

[アーキテクチャ図](./public/architecture_diagram.png)

## ステップバイステップ セットアップ

このテンプレートをデプロイする際、手順の順序が重要です。 起動するために以下の手順に従ってください。

### デプロイの開始

#### Vercel デプロイ ボタン

[Vercel デプロイボタン](https://vercel.com/button) (新しいタブで開きます)

Vercel デプロイは、このテンプレートを使って GitHub アカウントに新しいリポジトリを作成し、新しい Supabase プロジェクトの作成をガイドします。

[Supabase Vercel デプロイ統合](https://vercel.com/integrations/supabase) は必要な Supabase 環境変数を設定し、SQL マイグレーション ([./supabase/migrations/20230530034630_init.sql)](./supabase/migrations/20230530034630_init.sql) を実行してアカウントのデータベース スキーマを設定します。

作成されたテーブルはプロジェクトの [テーブルエディタ](https://app.supabase.com/project/_/editor) で確認できます。

自動設定が失敗した場合、[Supabase アカウントを作成](https://app.supabase.com/projects) し、必要に応じて新しいプロジェクトを作成してください。 プロジェクト内にある [SQL エディター](https://app.supabase.com/project/_/sql) に移動し、"Stripe サブスクリプション" スターター テンプレートをクイックスタートセクションから選択してください。

### 認証の設定

[このガイド](https://supabase.com/docs/guides/auth/social-login/auth-github) に従い、GitHub を用いた OAuth アプリを設定し、Supabase がそれを認証プロバイダーとして使うように設定してください。

Supabase プロジェクト内で、
[auth > URL configuration](https://app.supabase.com/project/_/auth/url-configuration)に移動し、メインのプロダクションURL
(例: https://your-deployment-url.vercel.app)
をサイトURLとして設定します。

https://vns-masakinihirota.vercel.app
NEXT_PUBLIC_SITE_URL
次に、Vercel デプロイ設定で、新しい **本番** 環境変数を作成し、名前を `NEXT_PUBLIC_SITE_URL` にし、そこに同じ URL を設定してください。 プレビューブランチとローカル開発が正しく動作するように、プレビューと開発環境の選択を解除してください。

**[省略可] デプロイプレビュー用のリダイレクトワイルドカードを設定する (デプロイボタン経由でインストールした場合不要)**

「Vercelにデプロイ」ボタンを使用してこのテンプレートをデプロイした場合、この手順はスキップできます。

Supabase Vercel インテグレーションはリダイレクトワイルドカードを自動的に設定します。Supabase の [認証設定](https://app.supabase.com/project/_/auth/url-configuration) にアクセスして確認すると、「リダイレクト URL」の下にリダイレクトの一覧が表示されます。

そうでない場合は、認証リダイレクト (メール確認、マジックリンク、OAuth プロバイダー) がデプロイプレビューで正しく機能するように、[認証設定](https://app.supabase.com/project/_/auth/url-configuration) に移動し、次のワイルドカード URL を「リダイレクト URL」に追加します: `https://*-username.vercel.app/**` リダイレクトワイルドカードパターンの詳細については、[ドキュメント](https://supabase.com/docs/guides/auth#redirect-urls-and-wildcards) を参照してください。

**[省略可] Supabase 環境変数を設定する (デプロイボタン経由でインストールした場合不要)**

「Vercelにデプロイ」ボタンを使用してこのテンプレートをデプロイした場合、この手順はスキップできます。

Vercelの

Supabase Vercel インテグレーションは環境変数を自動的に設定します。Vercel プロジェクトの設定に移動し、「環境変数」をクリックすると、Supabase アイコンが隣にある環境変数のリストが表示されます。

そうでない場合は、[API 設定](https://app.supabase.com/project/_/settings/api) に移動し、それらを Vercel デプロイメントインターフェイスに貼り付けます。

プロジェクト API キーをコピーして `NEXT_PUBLIC_SUPABASE_ANON_KEY` と `SUPABASE_SERVICE_ROLE_KEY` フィールドに貼り付け、プロジェクト URL をコピーして `NEXT_PUBLIC_SUPABASE_URL` として Vercel に貼り付けます。

これで Supabase 設定が完了です! もうすぐです。

### Stripe の設定

次に、テスト決済を処理するために [Stripe](https://stripe.com/) を設定する必要があります。まだ Stripe アカウントを持っていない場合は、今すぐ作成してください。

以下の手順では、「テストモード」トグルがオンになっていることを確認してください ([https://stripe.com/docs/testing](https://stripe.com/docs/testing))。

#### Webhookを作成する

Stripe の「開発者」セクションで Webhook を作成する必要があります。上記のアーキテクチャ図では、この Webhook は Stripe を Vercel サーバーレス関数に接続する部分です。

1. [テストエンドポイントページ](https://dashboard.stripe.com/test/webhooks) で「エンドポイントの追加」ボタンをクリックします。
2. プロダクションデプロイメント URL の後に `/api/webhooks` を入力して、エンドポイント URL を指定します。(例: `https://your-deployment-url.vercel.app/api/webhooks`)
3. 「イベントの選択」見出しの下の「リスニングするイベントの選択」をクリックします。
4. 「送信するイベントの選択」セクションで「すべて選択」をクリックします。
5. 次の手順で必要になるので、`Signing secret` をコピーします (例: `whsec_xxx`) (Webhook ID `we_xxxx` をコピーしないように注意してください)。
6. 以前のデプロイ時に設定した `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` と `STRIPE_SECRET_KEY` に加えて、Webhook secret を `STRIPE_WEBHOOK_SECRET` 環境変数として追加する必要があります。

#### 新しい環境変数で再デプロイ

新しく設定した環境変数を有効にしてすべてが連携するようにするには、Vercel でアプリを再デプロイする必要があります。Vercel ダッシュボードでデプロイに移動し、オーバーフローメニューボタンをクリックして「再デプロイ」を選択します («既存のビルドキャッシュを使用» オプションは有効にしないでください)。Vercel がアプリを再構築および再デプロイしたら、製品と価格を設定する準備が整いました。

#### 製品と価格情報の作成

アプリケーションの Webhook は Stripe 上の製品の更新を監視し、自動的に Supabase データベースに伝播します。Webhook リスナーが実行されているので、Stripe ダッシュボード ([https://dashboard.stripe.com/test/products](https://dashboard.stripe.com/test/products)) で製品と価格情報を作成できます。

Stripe Checkout は現在、特定の期間ごとに事前に設定された金額を請求する課金方式をサポートしています。より複雑なプラン (たとえば、異なる価格帯や席数) はまだサポートされていません。

たとえば、以下のような異なる価格帯を持つビジネスモデルを作成できます。

- 製品 1: Hobby
  - 価格 1: 月額 1,000 円
  - 価格 2: 年額 10,000 円
- 製品 2: フリーランサー
  - 価格 1: 月額 2,000 円
  - 価格 2: 年額 20,000 円

オプションとして、セットアップを高速化するために、Stripe アカウントにテスト用の製品と価格データを投入するための [フィクスチャファイル](fixtures/stripe-fixtures.json) を追加しました。[Stripe CLI](https://stripe.com/docs/stripe-cli#install) の `fixtures` コマンドは、この JSON ファイルで定義された一連の API リクエストを実行します。`stripe fixtures fixtures/stripe-fixtures.json` を実行するだけです。

**重要:** Stripe ウェブフックが正しく設定され、必要なすべての環境変数で再デプロイされていることを確認してください。

## Stripe カスタマーポータルの設定

1. [設定](https://dashboard.stripe.com/settings/branding) でカスタムブランディングを設定します。
2. カスタマーポータル [設定](https://dashboard.stripe.com/test/settings/billing/portal) を設定します。
   - 「顧客による支払い方法の更新を許可」をオンにします。
   - 「顧客によるサブスクリプションの更新を許可」をオンにします。
   - 「顧客によるサブスクリプションのキャンセルを許可」をオンにします。
   - 追加したい製品と価格を追加します。
   - 必要なビジネス情報とリンクを設定します。

## 完了

少し長くなりましたが、設定する価値はあります。これで、顧客からの定期収益を得る準備が整いました。

## ローカル開発

まだ行っていない場合は、GitHub リポジトリをローカルマシンにクローンしてください。

### 依存関係のインストール

[pnpm](https://pnpm.io/installation) がインストールされていることを確認し、以下を実行します。

```bash
pnpm install
```

次に、[Vercel CLI](https://vercel.com/docs/cli) を使用してプロジェクトをリンクします。

```bash
pnpm dlx vercel login
pnpm dlx vercel link
```

`pnpm dlx` は、パッケージを依存関係としてインストールせずにレジストリから実行します。代わりに、これらのパッケージをグローバルにインストールし、`pnpm dlx` 部分を削除することもできます。

開発とテストにローカル Supabase インスタンスを使用する予定がない場合は、Vercel CLI を使用して開発環境変数をダウンロードできます。

```bash
pnpm dlx vercel env pull .env.local
```

このコマンドを実行すると、プロジェクトフォルダー内に新しい `.env.local` ファイルが作成されます。セキュリティ上の理由により、`SUPABASE_SERVICE_ROLE_KEY` は [Supabase ダッシュボード](https://app.supabase.io/) (`設定 > API`) から手動で設定する必要があります。ローカル Supabase インスタンスを使用していない場合は、`package.json` 内の `supabase:generate-types` スクリプトの `--local` フラグを `--linked` または `--project-id <string>` に変更する必要があります。(参照 -> [[https://supabase.com/docs/reference/cli/supabase-gen-types-typescript](https://supabase.com/docs/reference/cli/supabase-gen-types-typescript)])

## Supabaseを使ったローカル開発

開発とテストを行う際は、ローカル Supabase インスタンスを使用することを強くおすすめします。`package.json` 内には、これを行うためのカスタムコマンドが用意されています。

まず、[Docker](https://www.docker.com/get-started/) をインストールする必要があります。次に、以下のファイルをコピーまたは名前を変更してください:

- `.env.local.example` -> `.env.local`
- `.env.example` -> `.env`

次に、以下のコマンドを実行してローカル Supabase インスタンスを起動し、マイグレーションを実行してデータベーススキーマを設定します。

```bash
pnpm supabase:start
```

ターミナルに出力される URL を使用して、Supabase スタック内のさまざまなサービスにアクセスできます。Supabase Studio では、ローカルデータベースインスタンスに変更を加えることができます。

`service_role_key` の値をコピーして、`.env.local` ファイル内の `SUPABASE_SERVICE_ROLE_KEY` の値として貼り付けてください。

以下のコマンドを使用すると、いつでもこれらの URL を出力できます。

```bash
pnpm supabase:status
```

ローカル Supabase インスタンスをプロジェクトにリンクするには、次のコマンドを実行し、上記で作成した Supabase プロジェクトに移動して、データベースパスワードを入力してください。

```bash
pnpm supabase:link
```

データベースパスワードをリセットする必要がある場合は、[データベース設定](https://supabase.com/dashboard/project/_/settings/database) に移動し、「データベースパスワードをリセット」をクリックして、パスワードマネージャーにコピーしてください!

## ローカル開発環境でのセットアップ

**警告**: この手順はローカル開発環境を本番環境と同じプロジェクトにリンクします。現時点ではテストデータのみが格納されていますが、顧客データが含まれるようになったら、[ブランチング](https://supabase.com/docs/guides/platform/branching) を使用するか、プレビュー環境やステージング環境を手動で作成することを推奨します。これにより、顧客データがローカルで使用されず、スキーマの変更やマイグレーションを本番環境にプッシュする前に十分にテストできるようになります。

プロジェクトをリンクしたら、リモートデータベースで行ったスキーマ変更を次のコマンドで取り込むことができます。

```bash
pnpm supabase:pull
```

リモートデータベースに追加したデータをローカルデータベースにシードするには、次のコマンドを使用します。

```bash
pnpm supabase:generate-seed
pnpm supabase:reset
```

**警告**: このコマンドは本番環境のデータベースからデータをシードします。現時点ではテストデータのみが格納されていますが、実際の顧客データが含まれるようになったら、[ブランチング](https://supabase.com/docs/guides/platform/branching) を使用するか、プレビュー環境やステージング環境を手動で設定することを推奨します。

Supabase Studio でデータベーススキーマを変更し、次のコマンドを実行して、スキーマに一致する TypeScript 型を生成できます。

```bash
pnpm supabase:generate-types
```

また、次のコマンドでローカルデータベーススキーマに行ったすべての変更を含むマイグレーションファイルも自動生成できます。

```bash
pnpm supabase:generate-migration
```

そして、これらの変更をリモートデータベースにプッシュします。

```bash
pnpm supabase:push
```

変更を本番環境にデプロイする前に、必ずローカル環境とステージング環境/プレビュー環境で十分にテストしてください!

### Stripe CLIを使用した Webhook テスト

[Stripe CLI](https://stripe.com/docs/stripe-cli) を使用して、Stripe アカウントにログインします。

```bash
pnpm stripe:login
```

このコマンドを実行すると、ブラウザで開く URL が表示され、Stripe アカウントにアクセスできるようになります。

次に、ローカル Webhook 転送を開始します。

```bash
pnpm stripe:listen
```

この Stripe コマンドを実行すると、Webhook シークレット (例: `whsec_***`) がコンソールに出力されます。この値を、`.env.local` ファイルの `STRIPE_WEBHOOK_SECRET` に設定してください。まだ設定していない場合は、Stripe ダッシュボードの **テストモード** (!) キーを使用して、`.env.local` ファイルに `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` と `STRIPE_SECRET_KEY` も設定してください。

### Next.js クライアントの実行

別の端末で次のコマンドを実行し、開発サーバーを起動します。

```bash
pnpm dev
```

Webhook 転送と開発サーバーは、アプリケーションが正しく動作するように、2 つの別々の端末で同時に実行する必要があります。

最後に、ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスし、レンダリングされたアプリケーションを確認します。

## 公開

### テスト製品のアーカイブ

公開する前に、すべてのテストモードの Stripe 製品をアーカイブします。本番モードの製品を作成する前に、以下の手順に従って本番環境の環境変数と Webhook を設定してください。

### 本番環境変数の設定

プロジェクトを本番モードで実行し、Stripe での支払い処理を行うには、Stripe を "テストモード" から "本番モード" に切り替えます。API キーは本番モードとテストモードで異なるため、別の本番モードの Webhook を作成する必要があります。これらの値をコピーして Vercel に貼り付け、テストモードの値を置き換えます。

### 再デプロイ

その後、変更を反映させるために、本番デプロイを再構築する必要があります。プロジェクトのダッシュボードで "デプロイ" タブに移動し、最新のデプロイを選択して、オーバーフローメニューボタン (「訪問」ボタンの隣) をクリックし、「再デプロイ」 (「既存のビルドキャッシュを使用」オプションは有効にしないでください) を選択します。

本番モードで実行されていることを確認するには、[Stripe テストカード](https://stripe.com/docs/testing) でチェックアウトを試みてください。テストカードは機能しません。
