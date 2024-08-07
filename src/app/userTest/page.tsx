import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user: ", user);

  return (
    <div className="">
      {user ? <div>ユーザー認証中</div> : <div>未ログイン</div>}
      {/* 名前を表示 */}
      <div>{user?.user_metadata.full_name}</div>
      {/* 認証使用プロバイダー */}
      <div>{user?.app_metadata.provider}</div>
      <div>プロバイダー: {user?.app_metadata.provider}</div>
      {/* 使用されたプロバイダーのリスト */}
      <div>プロバイダーリスト: {user?.app_metadata.providers.join(", ")}</div>
      {/* 匿名認証の表示 */}
      <div>
        匿名認証:{" "}
        {user?.app_metadata.anonymous
          ? "is_anonymous: true"
          : "is_anonymous: false"}
      </div>
      {/* ロール */}
    </div>
  );
}
