WebConfig =
        {
                BaseUrl: "http://localhost:8010/",
                // BaseUrl: "http://192.168.0.103:8010/",
                // BaseUrl: "https://szb.fya168.com/airlineapi/",
                // BaseMobanUrl: "http://192.168.2.66:8080/landAnalysisApi/file/",
                BaseImgUrl: "http://yunland.oss-cn-hangzhou.aliyuncs.com/",
                cookieKeyName: 'RYKJ_WebAdmin_key',
                cookieToken: 'RYKJ_WebAdmin_key2',
                BaseReportUrl: "http://beta.yunland.cn:9092/landAnalysisApi/",
                Token: false,
                PlatFormName: "后台数据维护",
                AirLineArray: [{ value: 1, name: "航联" }, { value: 2, name: "俄航" }, { value: 3, name: "其他" }],
                AgentTypeArray: [{ value: 1, name: "二级代理" }, { value: 2, name: "企业用户" }, { value: 3, name: "代售" }],
                PayStateArray: [{ value: 1, name: "已支付" }, { value: 2, name: "未支付" }, { value: 3, name: "部分支付" }],
                HKPayStateArray: [{ value: 1, name: "已结算" }, { value: 2, name: "未结算" }],
                CycTimeArray: [{ value: 1, name: "1-7号" }, { value: 2, name: "8-15号" }, { value: 3, name: "16-23号" },{ value: 4, name: "24-31号" }],
        }


if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
                value: function assign(target, varArgs) { // .length of function is 2
                        'use strict';
                        if (target == null) { // TypeError if undefined or null
                                throw new TypeError('Cannot convert undefined or null to object');
                        }

                        var to = Object(target);

                        for (var index = 1; index < arguments.length; index++) {
                                var nextSource = arguments[index];

                                if (nextSource != null) { // Skip over if undefined or null
                                        for (var nextKey in nextSource) {
                                                // Avoid bugs when hasOwnProperty is shadowed
                                                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                                        to[nextKey] = nextSource[nextKey];
                                                }
                                        }
                                }
                        }
                        return to;
                },
                writable: true,
                configurable: true
        });
}