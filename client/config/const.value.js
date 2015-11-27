angular.module('webApp')
    .value('$$Genres', [
        {
            name        : '和食',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : '魚介・海鮮料理',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : '焼肉・ホルモン・鉄板焼き',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : 'イタリアン・フレンチ',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : '中華・アジア・エスニック料理',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : '居酒屋',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : 'バー',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : 'ラーメン',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : 'カレー',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : 'B級グルメ',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : 'カフェ・スイーツ',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        },
        {
            name        : 'その他',
            taste       : 'おいしさ',
            beautiful   : '見た目の美しさ',
            quality     : '食材の品質',
            originality : '創意工夫さ',
            sense       : '五感への刺激(シズル感)'
        }
    ])
    .value('$$Scenes', [
        {
            name   : '高級接待',
            value1 : '空間の高級感',
            value2 : '感動の度合い',
            value3 : 'スタッフの対応力',
            value4 : 'オリジナリティー',
            value5 : '個別の対応力'
        },
        {
            name   : '通常接待',
            value1 : 'メニューの豊富さ',
            value2 : 'プライバシーへの配慮',
            value3 : 'スタッフの対応力',
            value4 : 'オリジナリティー',
            value5 : '費用対効果'
        },
        {
            name   : '社内利用',
            value1 : '費用対効果',
            value2  : 'メニューの豊富さ',
            value3 : 'スタッフの対応力',
            value4 : '部屋のバリエーション',
            value5 : 'アクセス'
        },
        {
            name   : '家族利用',
            value1 : '部屋のバリエーション',
            value2 : 'メニューの豊富さ',
            value3 : 'スタッフの対応力',
            value4 : '子供への配慮',
            value5 : '高齢者への配慮'
        },
        {
            name   : 'お土産利用',
            value1 : '費用対効果',
            value2 : '新規性（めずらしい）',
            value3 : 'こだわり度',
            value4 : 'パッケージ',
            value5 : '入手難易度'
        },
        {
            name   : '一人利用',
            value1 : '味（本物志向度）',
            value2 : '１人客への配慮',
            value3 : 'メニューの豊富さ（変化）',
            value4 : '利便性',
            value5 : 'こだわり'
        },
        {
            name   : 'デート利用',
            value1 : 'インテリア',
            value2 : '雰囲気',
            value3 : 'スタッフの対応力',
            value4 : 'プライバシーへの配慮',
            value5 : '眺望の良さ'
        }
    ])
    .value('$$Rate', [
            {
                rating: 1
            },
            {
                rating: 2
            },
            {
                rating: 3
            },
            {
                rating: 4
            },
            {
                rating: 5
            }
    ])
    .value('$$Alert', {
            successRegister: {
                msg  : '登録が完了しました。',
                type : 'info'
            },
            successUpdate: {
                msg  : '更新が完了しました。',
                type : 'success'
            },
            successDelete: {
                msg  : 'データを削除しました。',
                type : 'danger'
            },
            failureRegister: {
                msg  : '登録に失敗しました',
                type : 'warning'
            },
            failureUpdate: {
                msg  : '更新に失敗しました',
                type : 'warning'
            },
            failureDelete: {
                msg  : '削除に失敗しました',
                type : 'warning'
            }
    }).
    value('$$Prefs', [
    {
        "label": "北海道",
        "slug": "hokkaido"
    },
    {
        "label": "青森県",
        "slug": "aomori"
    },
    {
        "label": "岩手県",
        "slug": "iwate"
    },
    {
        "label": "宮城県",
        "slug": "miyagi"
    },
    {
        "label": "秋田県",
        "slug": "akita"
    },
    {
        "label": "山形県",
        "slug": "yamagata"
    },
    {
        "label": "福島県",
        "slug": "fukushima"
    },
    {
        "label": "茨城県",
        "slug": "ibaraki"
    },
    {
        "label": "栃木県",
        "slug": "tochigi"
    },
    {
        "label": "群馬県",
        "slug": "gunma"
    },
    {
        "label": "埼玉県",
        "slug": "saitama"
    },
    {
        "label": "千葉県",
        "slug": "chiba"
    },
    {
        "label": "東京都",
        "slug": "tokyo"
    },
    {
        "label": "神奈川県",
        "slug": "kanagawa"
    },
    {
        "label": "新潟県",
        "slug": "nigata"
    },
    {
        "label": "富山県",
        "slug": "toyama"
    },
    {
        "label": "石川県",
        "slug": "ishikawa"
    },
    {
        "label": "福井県",
        "slug": "fukui"
    },
    {
        "label": "山梨県",
        "slug": "yamanashi"
    },
    {
        "label": "長野県",
        "slug": "nagano"
    },
    {
        "label": "岐阜県",
        "slug": "gifu"
    },
    {
        "label": "静岡県",
        "slug": "shizuoka"
    },
    {
        "label": "愛知県",
        "slug": "aichi"
    },
    {
        "label": "三重県",
        "slug": "mie"
    },
    {
        "label": "滋賀県",
        "slug": "shiga"
    },
    {
        "label": "京都府",
        "slug": "kyoto"
    },
    {
        "label": "大阪府",
        "slug": "osaka"
    },
    {
        "label": "兵庫県",
        "slug": "hyogo"
    },
    {
        "label": "奈良県",
        "slug": "nara"
    },
    {
        "label": "和歌山県",
        "slug": "wakayama"
    },
    {
        "label": "鳥取県",
        "slug": "tottori"
    },
    {
        "label": "島根県",
        "slug": "shimane"
    },
    {
        "label": "岡山県",
        "slug": "okayama"
    },
    {
        "label": "広島県",
        "slug": "hiroshima"
    },
    {
        "label": "山口県",
        "slug": "yamaguchi"
    },
    {
        "label": "徳島県",
        "slug": "tokushima"
    },
    {
        "label": "香川県",
        "slug": "kagawa"
    },
    {
        "label": "愛媛県",
        "slug": "ehime"
    },
    {
        "label": "高知県",
        "slug": "kochi"
    },
    {
        "label": "福岡県",
        "slug": "fukuoka"
    },
    {
        "label": "佐賀県",
        "slug": "saga"
    },
    {
        "label": "長崎県",
        "slug": "nagasaki"
    },
    {
        "label": "熊本県",
        "slug": "kumamoto"
    },
    {
        "label": "大分県",
        "slug": "oita"
    },
    {
        "label": "宮崎県",
        "slug": "miyazaki"
    },
    {
        "label": "鹿児島県",
        "slug": "kagoshima"
    },
    {
        "label": "沖縄県",
        "slug": "okinawa"
    }
]);
