# GitHub Secrets 설정 가이드

## 📋 필요한 Secrets

GitHub Actions 워크플로우가 작동하려면 다음 Secrets를 설정해야 합니다:

1. **NOTION_API_KEY** - Notion Integration 토큰
2. **NOTION_DATABASE_ID** - Notion 데이터베이스 ID

## 🔐 GitHub Secrets 설정 방법

### Step 1: GitHub 저장소로 이동

1. 브라우저에서 GitHub 저장소를 엽니다
   - URL: `https://github.com/Ohmyprogram/works`

### Step 2: Settings 메뉴 접근

1. 저장소 상단 메뉴에서 **Settings** 탭을 클릭합니다
   - 저장소의 맨 오른쪽 탭입니다
   - ⚙️ Settings

### Step 3: Secrets and variables 설정

1. 왼쪽 사이드바에서 **"Secrets and variables"** 를 찾습니다
2. 하위 메뉴에서 **"Actions"** 를 클릭합니다
   - 경로: Settings → Secrets and variables → Actions

### Step 4: 새로운 Repository Secret 추가

#### 4.1 NOTION_API_KEY 추가

1. **"New repository secret"** 버튼을 클릭합니다
2. 다음 정보를 입력합니다:
   - **Name**: `NOTION_API_KEY`
   - **Secret**: 실제 Notion Integration 토큰 값
     - 예: `secret_abcdefghijklmnopqrstuvwxyz1234567890`
3. **"Add secret"** 버튼을 클릭합니다

#### 4.2 NOTION_DATABASE_ID 추가

1. 다시 **"New repository secret"** 버튼을 클릭합니다
2. 다음 정보를 입력합니다:
   - **Name**: `NOTION_DATABASE_ID`
   - **Secret**: 실제 Notion 데이터베이스 ID
     - 예: `28283baaa342800c93c5e8d91b454bcb`
3. **"Add secret"** 버튼을 클릭합니다

## 🔍 Secret 값 확인 방법

### Notion API Key 찾기:

1. [Notion Integrations](https://www.notion.so/my-integrations) 페이지로 이동
2. 생성한 Integration을 클릭
3. "Internal Integration Secret" 값을 복사
   - `secret_`로 시작하는 긴 문자열입니다

### Notion Database ID 찾기:

1. Notion에서 데이터베이스 페이지를 엽니다
2. URL을 확인합니다:
   ```
   https://www.notion.so/myworkspace/DATABASE_ID?v=...
                                    ^^^^^^^^^^^^
                                    이 부분이 Database ID입니다
   ```
3. 또는 공유 링크에서:
   ```
   https://www.notion.so/DATABASE_ID
                         ^^^^^^^^^^^^
                         이 부분이 Database ID입니다
   ```

## ✅ 설정 완료 확인

Secrets가 정상적으로 추가되면:

1. **Settings → Secrets and variables → Actions** 페이지에서
2. "Repository secrets" 섹션에 다음이 표시됩니다:
   - `NOTION_API_KEY` - Updated [시간]
   - `NOTION_DATABASE_ID` - Updated [시간]

## 🚀 배포 실행 방법

### 자동 배포 (권장)

main 브랜치에 push하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update content"
git push origin main
```

### 수동 배포 (선택사항)

1. GitHub 저장소에서 **Actions** 탭 클릭
2. 왼쪽에서 **"Deploy to GitHub Pages"** 워크플로우 선택
3. **"Run workflow"** 버튼 클릭
4. **"Run workflow"** 확인 클릭

## 📊 배포 상태 확인

1. **Actions** 탭에서 워크플로우 실행 상태를 확인할 수 있습니다
2. 녹색 체크 ✅ = 성공
3. 빨간 X ❌ = 실패 (클릭하여 에러 로그 확인)

## 🌐 배포된 사이트 접속

배포가 성공하면 다음 URL에서 사이트를 확인할 수 있습니다:

```
https://ohmyprogram.github.io/works
```

## ⚠️ 주의사항

1. **Secret 값은 한 번 입력하면 다시 볼 수 없습니다**
   - 값을 잊어버렸다면 삭제 후 다시 추가해야 합니다

2. **Secret 이름은 정확히 일치해야 합니다**
   - 대소문자 구분됩니다
   - 공백이 없어야 합니다

3. **Secret 값에 따옴표를 포함하지 마세요**
   - ❌ 잘못된 예: `"secret_abc123"`
   - ✅ 올바른 예: `secret_abc123`

4. **GitHub Pages 설정 확인**
   - Settings → Pages에서
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)

## 🔧 문제 해결

### 배포가 실패하는 경우:

1. **Actions 탭에서 에러 로그 확인**
   - 빨간 X 표시된 워크플로우 클릭
   - 에러 메시지 확인

2. **일반적인 에러와 해결방법:**

   **"Error: NOTION_API_KEY is required"**
   - Secret이 올바르게 설정되지 않음
   - Secret 이름 확인 (대소문자 주의)

   **"Error: Invalid Notion API key"**
   - API 키가 잘못됨
   - Notion Integration 페이지에서 다시 복사

   **"Error: Database not found"**
   - Database ID가 잘못됨
   - Integration이 데이터베이스에 접근 권한이 없음
   - Notion에서 Integration 공유 확인

### gh-pages 브랜치가 생성되지 않는 경우:

```bash
# 로컬에서 수동으로 생성
git checkout --orphan gh-pages
git rm -rf .
echo "GitHub Pages branch" > index.html
git add index.html
git commit -m "Initial gh-pages commit"
git push origin gh-pages
git checkout main
```

## 📝 체크리스트

배포 전 확인사항:

- [ ] Notion Integration 생성 완료
- [ ] Notion Database에 Integration 공유 완료
- [ ] NOTION_API_KEY Secret 설정 완료
- [ ] NOTION_DATABASE_ID Secret 설정 완료
- [ ] .github/workflows/deploy.yml 파일 존재
- [ ] package.json에 build, deploy 스크립트 존재
- [ ] gatsby-config.ts에 pathPrefix 설정 확인

## 🆘 추가 도움말

문제가 계속되면:

1. Actions 탭의 에러 로그를 확인하세요
2. .env.development 파일의 값과 GitHub Secrets 값이 일치하는지 확인하세요
3. Notion Integration이 데이터베이스에 접근 권한이 있는지 확인하세요

---

**마지막 업데이트**: 2025-10-04
