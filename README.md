### 本地运行

#### 1、安装依赖

```bash
npm install
```

#### 2、运行

```bash
npm run start
```

#### 3、打包

```bash
npm run build 
```



### 服务器部署

#### 1、购买云服务器，安装centos镜像

#### 2、安装nodejs

```bash
# 使用 NVM 安装 Node.js 可以更方便管理不同版本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# 重新加载配置
source ~/.bashrc
# 安装 Node.js
nvm install 16.20.2
```

#### 3、安装Git

```bash
# 安装 Git
sudo yum install git

# 验证安装
git --version

# 配置用户信息
git config --global user.name "您的姓名"
git config --global user.email "您的邮箱地址"

# 克隆仓库代码
git clone "https://github.com/****/*****.git"
```

#### 4、安装MySQL

```bash
# 添加 MySQL Yum 仓库
wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

sudo rpm -Uvh mysql80-community-release-el7-3.noarch.rpm

# 安装 MySQL 服务器
sudo yum install mysql-community-server

# 如遇mysql-community-client-8.0.36-1.el7.x86_64.rpm 的公钥尚未安装
#从 MySQL 官网下载公钥
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
#重新安装

# 启动MySQL
sudo systemctl start mysqld

#开机自启动
sudo systemctl enable mysqld

#获取临时 root 密码
sudo grep 'temporary password' /var/log/mysqld.log

#使用临时密码登录到 MySQL 并修改 root 密码
mysql -u root -p

#更改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';

# 创建数据库
CREATE DATABASE admin;

# 刷新权限
FLUSH PRIVILEGES;
# 退出 MySQL
exit;
```

#### 5、安装PM2

```bash
# 安装 PM2
npm install pm2 -g

# 使用 PM2 启动应用
pm2 start dist/main.js --name mynestapp

# 配置 PM2 开机自启
pm2 startup systemd
pm2 save
```

#### 3、安装Nginx

```bash
# 安装
sudo yum install nginx

# 启动Nginx服务
sudo systemctl start nginx

# 设置开机自启动
sudo systemctl enable nginx

# 开启防火墙
sudo systemctl start firewalld

# 设置开机自启动
sudo systemctl enable firewalld

# 放开80、443端口访问
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https

# 重载防火墙规则
sudo firewall-cmd --reload
```

#### 4、配置CI/CD自动化部署

##### 配置服务器和 GitHub 通信

```bash
# 生成SSH密钥对
ssh-keygen -t rsa -b 4096

# 查看并复制公钥
cat ~/.ssh/id_rsa.pub

# 公钥添加到~/.ssh/authorized_keys 文件中
vim ~/.ssh/authorized_keys

# 服务器上配置SSH密钥对访问
vim /etc/ssh/sshd_config
PubkeyAuthentication yes

# 重载SSH服务
sudo systemctl reload sshd

# 私钥添加到GitHub仓库的Secrets中
仓库--> settings --> Secrets and variables --> New repository secret -->命名为 DEPLOY_KEY，并将你的私钥粘贴到值字段中
```

##### 仓库根目录创建.GitHub/workflows/ci-cd.yml文件

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18' # 或者你选择的任何 Node.js 版本

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.5.3
        with:
          ssh-private-key: ${{ secrets.DEPLOY_KEY }}
      - name: Deploy to production
        run: |
          ssh -o StrictHostKeyChecking=no root@121.41.117.26 'cd /home/api/nest_server && git pull && npm install --production && npm run build && pm2 restart all'

```

