### 명령어
npm install : 프로젝트 실행에 필요한 node_moudle을 다운
npm run start : 프로젝트를 실행시키며 'localhost:3000'을 통해 접속한다.
npm run bulid : 프로젝트 빌드 명령어로서 '/build'경로에 빌드된 파일이 저장된다. 

### 사용법

1. 파일 불러오기
파일 선택 버튼을 통해 해당 폴더를 선택한다. 폴더 구조의 경우 각 카메라의 timestemp가 저장된 csv파일을 필요로 하며 point cloud 데이터의 경우 '/OUSTER0' 경로에 위치 시킨다.

2. 파일 전환 
Previous / Next 버튼을 통하여 point cloud 를 캔버스에 렌더한다.

3. 카메라 전환 
2D, 3D의 두가지 카메라가 존재하며 다음과 같은 기능을 수행할수 있다.

2D 카메라 : point cloud를 위에서 바라본 시점으로 화면의 중앙이 센서의 중심(0,0,0)이다. 마우스로 point cloud 드래그시 화면 이동이 가능하며 tag생성을 통해 원하는 태그를 만들수 있다.

3D 카메라 : point cloud를 3D로 바라본 시점으로 마우스를 통해 입체적인 회전이 가능하다.

공통기능 : 마우스 휠을 통해 확대 축소가 가능하다.

4. 카메라 위치 초기화
카메라를 초기 위치로 이동시킨다. 센서의 중심을 화면의 중심으로 이동시키며 회전을 초기화 한다.

5. Tag 생성
2D카메라 상태일 경우 마우스 드래그를 통해 tag를 생성할수 있다. ( 단축키 : 't' )

6. 파일 저장
SAVE 버튼을 통해 생성한 tag를 json파일로 저장이 가능하며 다운로드 형태로 진행된다. tag의 경우 해당 tag의 중심 x,y좌표와 해당 태그의 w,h 와 회전각 r을 저장한다.

7. 생성된 Tag 수정
tag생성시 obj box 에 태그가 생성되며 해당 obj box 에서 해당 tag를 선택 후 'w','s','a','d' 단축키를 통해 태그의 위치를 수정할 수 있으며 'e','q'를 통해 tag를 회전 시킬 수 있다.
이름 바꾸기의 경우 'T'아이콘을 통해 이름이 수정 가능하며 휴지통 아이콘을 통해 삭제가 가능하다.

8. 사진 리스트의 경우 클릭시 해당 사진을 확대할수 있으며 point cloud와 timestemp와 가장 가까운 사진을 보여준다.
