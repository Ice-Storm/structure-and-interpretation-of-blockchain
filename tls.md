比特币，以太坊，超级账本在建立网络连接保证节点间可靠通信的时，都直接采用了`传输层安全性协议（Transport Layer Security）`，TLS协议自从1999年发布以来已经广泛的应用在浏览器，电子邮件等应用中了，经过了大规模的验证，已经成为了互联网上保密通信的工业标准，可以说是目前构建区块链网络间通信的最佳选择。


### TLS/SSL协议
&emsp;&emsp;`TLS`传输层安全性协议及其前身`SSL`安全套接层（Secure Sockets Layer）是一种安全协议，目的是为互联网通信提供安全及数据完整性保障。

&emsp;&emsp;TLS建立安全通信的方式是通过非对称加密的方式交换对称加密所用到的密钥，对后续的通信采用对称加密的方式确保安全，也就是握手阶段和传输阶段。

### TLS/SSL握手过程
&emsp;&emsp;下面通过客户端（Client）如何向服务端（Server）建立连接。

&emsp;&emsp;第一步，客户端以明文的形式发起请求信息（client_hello），其中信息包含；
- 客户端生成的随机数`random_C`
- 支持的最高`TLS`协议版本
- 客户端支持的加密套件`cipher suites`
- 支持的压缩算法列表
- 扩展字段

>  身份加密套件包括： 身份认证算法Au ，采用的密钥交换算法（密钥协商），对称加密算法，信息摘要算法Mac（校验信息的完整性）

-----
&emsp;&emsp;第二步，服务端收到客户端发来的请求以后，返回协商的信息（server_hello），其中包括
- 服务端生成的随机数`random_S`
- 使用`TLS`协议的版本
- 使用的压缩算法版本
- 选择的加密套件`cipher suites`
- 服务端配置的对应的证书链

-----
&emsp;&emsp;第三步，客户端（Server）收到服务端发来的请求以后，首先会检查服务端证书的合法性，如果合法就会进行如下操作；
- 客户端生成第三个随机数字`pre-master`
- 计算协商秘钥`enc_key=Func(random_C, random_S, pre-master)`
- 计算之前通信的所有参数的hash作为`sessionSecret`

&emsp;&emsp;将`sessionSecret`和用数字证书携带的公钥加密`pre-master`发送给服务器（Server）

-----
&emsp;&emsp;第四步，服务端（Server）收到客户端发来的请求后，会进行如下操作
- 用私钥解密或者`pre-master`的值
- 基于`random_S`，`random_C`和`pre-master`计算协商秘钥`enc_key=Func(random_C, random_S, pre-master)`
- 验证`sessionSecret`

&emsp;&emsp;服务端进行完上面的操作以后，会用协商秘钥加密`sessionSecret`作为`encrypted_handshake_message`消息发送给客户端。

-----
&emsp;&emsp;第五步，客户端（Client）接收到`encrypted_handshake_message`消息以后，会用自己计算出的协商密钥解密`encrypted_handshake_message`查看里面`sessionSecret`是否和自己生成的一致，如果一致则用协商出来的密钥加密后续的通信。

&emsp;&emsp;`sessionSecret`就是TLS协议传输阶段对称加密所用到的密钥。

### 双向认证
&emsp;&emsp;上面的整个过程，都是客户端单向认证服务端，也是最为常用的场景。同时，服务端也可以要求验证客户端，比较常见的场景就是大额网银汇款转账会需要在电脑上插入`U盾`。

&emsp;&emsp;`U盾`中包含银行签发的证书用来验证客户端。

&emsp;&emsp;双向认证在单向认证第二步的时候，服务器会要求客户端发送证书，来校验客户端证书有效性。

&emsp;&emsp;TLS通过上面的五个步骤完成了密钥的协商，其中用到了三个随机数`random_C，random_S，pre-master`，而如何通过三个随机数完成密钥交换就需要用到密钥协商算法。
