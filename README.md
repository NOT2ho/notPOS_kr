npm에 한국어 형태소 분석기가 없어서 만들었습니다.
형태소 태그는 부정확합니다.
dic 경로 문제를 해결하였으나 문제가 생긴다면 github으로 알려 주세요

입력

```
pos = new Pos();
pos.tag('복잡계에 태어난 우리는 사랑이 무엇인지 알아 가고 / 스며들어 온 추억들에게 우리를 잊게 해 달라고 말해 본다 / 고립계에 태어난 너와 나에겐 서로가 서로의 전부였을까 / 생성되는 난수들은 의미 없이 죽어가');
```

출력

```
[
  [ '복잡', 'XR' ],  [ '계', 'XSN' ],    [ '에', 'VV' ],
  [ '태', 'VV' ],    [ '어', 'XSN' ],    [ '난', 'XR' ],
  [ '우리', 'VV' ],  [ '는', 'JX' ],     [ '사랑', 'NNP' ],
  [ '이', 'XSN' ],   [ '무엇', 'NP' ],   [ '인지', 'NNP' ],
  [ '알', 'VV' ],    [ '아', 'XSN' ],    [ '가고', 'NNP' ],
  [ '/', 'UNK' ],    [ '스며들', 'VV' ], [ '어', 'XSN' ],
  [ '온', 'XR' ],    [ '추억', 'NR' ],   [ '들', 'XSV' ],
  [ '에게', 'NNP' ], [ '우리', 'VV' ],   [ '를', 'JX' ],
  [ '잊', 'VV' ],    [ '게', 'NP' ],     [ '해', 'XSV' ],
  [ '달라', 'VX' ],  [ '고', 'XR' ],     [ '말', 'VX' ],
  [ '해', 'XSV' ],   [ '본다', 'NNP' ],  [ '/', 'UNK' ],
  [ '고립', 'NNG' ], [ '계', 'XSN' ],    [ '에', 'VV' ],
  [ '태', 'VV' ],    [ '어', 'XSN' ],    [ '난', 'XR' ],
  [ '너와', 'NNG' ], [ '나에', 'NNP' ],  [ '겐', 'EC' ],
  [ '서로', 'NP' ],  [ '가', 'XSN' ],    [ '서로', 'NP' ],
  [ '의', 'XR' ],    [ '전부', 'NNG' ],  [ '였', 'EP' ],
  [ '을까', 'EF' ],  [ '/', 'UNK' ],     [ '생성', 'NNG' ],
  [ '되', 'XSV' ],   [ '는', 'JX' ],     [ '난수', 'NNG' ],
  [ '들은', 'NNG' ], [ '의미', 'NNP' ],  [ '없이', 'VV' ],
  [ '죽어', 'NNG' ], [ '가', 'XSN' ]
]
```

전처리 함수가 있습니다.

```
pos.preprocess();
```

dic : mecab_ko_dic(https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/) 변형

Copyright 2017- IBM Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
