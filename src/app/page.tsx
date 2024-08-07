// TOP PAGE 静的ページ
import Link from "next/link";

import Counter from "./(test)/Counter/Counter";
import SampleRsc from "./(test)/sample_rsc/page";
import { Button } from "./button/Button";

export default function Page() {
  // test用のblogId
  const blogId = "123"; // 動的ページのID
  return (
    <>
      {/* キャッチフレーズ */}
      昨日僕が感動したことを、今日の君はまだ知らない。
      <br />
      {/* unauthへのリンクを作成 */}
      {/* これはメイン画面に移動する用*/}
      <a href="/unauth">unauth</a>
      <br />
      <Button label="Storybook Test Button" />
      <br /> {/* userTestページへのリンク */}
      <Link href="/userTest">userTest</Link>
      <br />
      {/* Testページへのリンク */}
      {/* 普通のテスト */}
      <Link href="/Test">Test</Link>
      <br />
      {/* Hooksテスト */}
      <Counter />
      <br />
      {/* 動的ページのテスト */}
      <Link href={`${blogId}`}>dynamic</Link>
      <br />
      {/* React Server Componentのテスト */}
      <SampleRsc />
    </>
  );
}
