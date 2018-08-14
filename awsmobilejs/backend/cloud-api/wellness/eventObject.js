module.exports =
{
    "resource": "/wellness/{proxy+}",
    "path": "/wellness/user",
    "httpMethod": "GET",
    "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "br, gzip, deflate",
        "Accept-Language": "en-us",
        "CloudFront-Forwarded-Proto": "https",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-Mobile-Viewer": "false",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Tablet-Viewer": "false",
        "CloudFront-Viewer-Country": "US",
        "Host": "yk6izg6oif.execute-api.us-west-2.amazonaws.com",
        "If-None-Match": "W/\"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w\"",
        "User-Agent": "aws-amplify/0.4.x react-native",
        "Via": "2.0 695f949d220535f8366c01311cc211ba.cloudfront.net (CloudFront)",
        "X-Amz-Cf-Id": "b3hfHqt5izmbG_TnQC-a8ehOq7aagrSbJ9hq-RRxfp1EvwoU0dNA6g==",
        "x-amz-date": "20180726T053246Z",
        "x-amz-security-token": "AgoGb3JpZ2luEMn//////////wEaCXVzLXdlc3QtMiKAAoq2UUg8JFgfmlbRl/YOltVCApPDgOfqIkg2xGVjBxT6dAcvoNUtTWuIHgLh4Q0JhdGyP40o3m9egOaHRxJbHOJGGYvZmGHmLRN4zB+DObNatEL+TQIrsHf6huntQprc1HSrhaWuTo2x3/yMMQ+rDrH4PA5gKxyy0ejgyQLJgfrOdT+b5jU7/FjFVOI1wvNqPQR6tBvjJifmm+5ncqo4JruCebaf8OVzgFdpf4BcnLIArRbu++C/s0sV784lNy9vBXAhl57xhFZAoEUguRmfJfwSme2g4DN4zfo+XCPJldgoiCpJQNMvlBGW6YvNzw/iPfiSTd6iJkGdFxKuEL3pjVQqrwUIn///////////ARAAGgw5ODA4ODY5MjQ0NTEiDC6+o6WrO40/JKRzIyqDBXQ72ztvfkrDI5q3RyC26d+BkNI8YTX+mITiKRrfTWavNUZ7MHlHBmp5te+9nFQl0S/t218VodprbkmZWLtpCIunBu7rXuKdWfFjUUYnceh9sPQbWeuj5W9ONuG2R9pn7S4jmZPzqgxmERqSVF1AGVTZ3F1Ho06IfkKakKtLM819uxNHNRq7YdZ+KlPzWEa3F7KU7a0ZmRO+V5KoCxBRmhyJV1fbnZkgG8JzSQRRjyrHKfE3nv8c5rYFk5c7kJ59xaaiIUjI0cKDCNxs8DjLdsprzfaw1onf3yqQ7u0J2gvY+13KxTHHaPjevVaUx1BEB0aiy7AJeD0I+M/khjt9vzj713Isa+9NhJM4Ejo5NQvJKmckM68Am25b2oAaZXAWC4XJW2e8snE4tlGTtLFvsqOJWiPpLq6Km9KChezHhGQkpOfHqIx2L479Gjing0ddKFyK0kidiwtzCk3uVFJ6iijPTmYFFOuE5t5C4oqWPkwXhIFXeqGrstNmxhMt8F2AsxzVVeT03ZVTukJyQ/sIjv2yQRjTOKuaoTG5xzZbbv9ASatmYD0EOi8VcB3/Cy3zGqu6xULFnu8cm1snyvDYPseaNRt4jGO7hxIW9WZ9PExBqtNu0KhM2c3FI2K5cWEVyx8V2C7ia+sv++XhKKyOwniN0sFWosiJDChg5Q5SutOZu6lvWCuUMmrjP5UMFY3nMZHTifW3+JdpyedHeZniNKR47VJPJVenuHP8FSovARold9E0erQte1l1WQ3LuE0rXkvpnCBlr8aZAigBDGDw3SAHI2ioPTXzID5dk07AA1moBHZ+AwLcOeZItJIHZu0uDnmDjsT5FNuqPCJE8buDMl6KNDow/Lnl2gU=",
        "X-Amzn-Trace-Id": "Root=1-5b595cfe-371be3f5f39b914f602f0c20",
        "X-Forwarded-For": "47.149.25.34, 70.132.22.142",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
    },
    "queryStringParameters": null,
    "pathParameters": {
        "proxy": "user"
    },
    "stageVariables": {
        "stage": "Development"
    },
    "requestContext": {
        "resourceId": "ce9rnd",
        "resourcePath": "/wellness/{proxy+}",
        "httpMethod": "GET",
        "extendedRequestId": "Knt30ELIvHcFnew=",
        "requestTime": "26/Jul/2018:05:32:46 +0000",
        "path": "/Development/wellness/user",
        "accountId": "980886924451",
        "protocol": "HTTP/1.1",
        "stage": "Development",
        "requestTimeEpoch": 1532583166815,
        "requestId": "53f8ef93-9095-11e8-89f4-8f3577b49952",
        "identity": {
            "cognitoIdentityPoolId": "us-west-2:7b29dc84-6cb3-4c24-9243-42d4c84d43c5",
            "accountId": "980886924451",
            "cognitoIdentityId": "us-west-2:dfecebb9-b0d4-4818-804e-298c58557622",
            "caller": "AROAJYDYKV4CK2OZO3KDW:CognitoIdentityCredentials",
            "sourceIp": "47.149.25.34",
            "accessKey": "ASIA6IYLKVSRUWNM3TFG",
            "cognitoAuthenticationType": "authenticated",
            "cognitoAuthenticationProvider": "cognito-idp.us-west-2.amazonaws.com/us-west-2_OmR6oi2A8,cognito-idp.us-west-2.amazonaws.com/us-west-2_OmR6oi2A8:CognitoSignIn:8b1b090f-75d1-4255-a08b-4b1deea7c721",
            "userArn": "arn:aws:sts::980886924451:assumed-role/happyplaceapp_auth_MOBILEHUB_1689228557/CognitoIdentityCredentials",
            "userAgent": "aws-amplify/0.4.x react-native",
            "user": "AROAJYDYKV4CK2OZO3KDW:CognitoIdentityCredentials"
        },
        "apiId": "yk6izg6oif"
    },
    "body": null,
    "isBase64Encoded": false
}