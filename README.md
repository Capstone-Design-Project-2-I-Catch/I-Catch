# I-Catch
Eye Tracking과 AI를 활용한 키오스크



---
### Git Commit Convention & Branch

```
[뷰이름] label/#issueNumber - 작업내용

ex) [QA] MainView/#01 - 수정내용(01) / 수정내용(02)
ex) [Feat] MainView/#01 - 작업내용
```
1. Git Convention
  - `[Hotfix]` : issue나, QA에서 급한 버그 수정에 사용
  - `[Fix]` : 버그, 오류 해결
  - `[Add]` : Feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 시
  - `[Style]` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  - `[Feat]` : 새로운 기능 구현
  - `[Docs]` : README나 WIKI 등의 문서 개정
  - `[Chore]` : 코드 수정, 내부 파일 수정, 빌드 업무 수정, 패키지 매니저 수정
  - `[Rename]` : 파일 이름 변경이 있을 때 사용합니다
  - `[Refactor]` : 전면 수정이 있을 때 사용합니다
  - `[Remoce]` : 필요없는 파일 및 코드 삭제시 시용합니다
    
2. Branch 전략
```
  ex) MainView/#01
```   
  - `main` : 개발 완료 및 배포를 위한 브랜치
  - `develop` : feature 브랜치에서 구현된 기능들이 merge될 브랜치
  - `feat` : 기능을 개발하는 브랜치, 이슈별/작업별로 브랜치를 생성하여 기능을 개발한다 - feat브랜치는 issue이름을 토대로 작성
  - `hotfix` : 버그를 수정하는 브랜치

3. Issue 제목
```
  ex) PreviewView UI 및 기능
  ex) SaveFileView UI 및 기능
```
