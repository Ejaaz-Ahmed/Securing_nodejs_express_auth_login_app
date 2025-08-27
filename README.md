# Secure Node.js Express Login & Registration with JWT – Enhanced Version by Ejaz Ahmed
# 🔒 Week 4 – Threat Detection with Fail2ban

This feature branch (`feat/week4-threat-detection`) introduces **real-time intrusion detection** for our Node.js Express authentication app.  
It integrates **Fail2ban** with app logs to detect repeated failed login attempts and automatically block suspicious IPs.

---

## 📌 Objectives
- Monitor authentication logs for repeated login failures.
- Detect brute-force attempts in real time.
- Automatically ban malicious IPs using Fail2ban.
- Keep logs both **JSON structured** and **human-readable string format**.

---

## 📝 Log Configuration

The app generates two types of logs using **Winston**:
- **JSON logs** → `logs/security-%DATE%.log`
- **String logs** → `logs/security-string-%DATE%.log`

Example (string log):

2025-08-26 20:54:09 [warn]: login attempt from ::ffff:10.0.2.2 - reason: Invalid password - username: test


## ⚙️ Fail2Ban Filter Configuration

**File Location:** `/etc/fail2ban/filter.d/node-auth-string.conf`

```ini
[Definition]
failregex = ^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \[warn\]: login attempt from <HOST> - reason: Invalid password - username: .+$
ignoreregex =
```
# Fail2ban Configuration for Node.js Authentication

This repository contains a Fail2ban configuration to protect Node.js applications from brute force login attempts.

## 📝 Sample Log Entry

```
2025-08-26 20:54:09 [warn]: login attempt from ::ffff:10.0.2.2 - reason: Invalid password - username: test
```

---

## ⚙️ Fail2ban Filter

Created at:  
`/etc/fail2ban/filter.d/node-auth-string.conf`

```ini
[Definition]
failregex = ^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \[warn\]: login attempt from <HOST> - reason: Invalid password - username: .+$
ignoreregex =
```

## ⚙️ Fail2ban Jail

Configured in: `/etc/fail2ban/jail.local`

```ini
[node-auth-string]
enabled  = true
filter   = node-auth-string
logpath  = /home/ejazahmed/Securing_nodejs_express_auth_login_app/logs/security-string-*.log
maxretry = 3
findtime = 600
bantime  = 3600
```

## 🔎 Configuration Explanation

- **`maxretry = 3`** → Block IP after 3 failed login attempts
- **`findtime = 600`** → Monitor failed attempts within 10 minutes (600 seconds)
- **`bantime = 3600`** → Ban duration lasts 1 hour (3600 seconds)

## ▶️ Testing the Filter

Run this command to verify that Fail2ban correctly matches your log entries:

```bash
sudo fail2ban-regex /home/ejazahmed/Securing_nodejs_express_auth_login_app/logs/security-string-*.log /etc/fail2ban/filter.d/node-auth-string.conf
```

## 🚀 Usage

1. Copy the filter configuration to `/etc/fail2ban/filter.d/node-auth-string.conf`
2. Add the jail configuration to `/etc/fail2ban/jail.local`
3. Restart Fail2ban service:
   ```bash
   sudo systemctl restart fail2ban
   ```
4. Check the status:
   ```bash
   sudo fail2ban-client status node-auth-string
   ```

## 📋 Requirements

- Fail2ban installed on your system
- Node.js application logging failed login attempts in the specified format
- Appropriate log file permissions for Fail2ban to read

---

*This configuration helps protect your Node.js authentication system from brute force attacks by automatically blocking suspicious IP addresses.*

---

## Author

**Ejaz Ahmed**  
Cyber Security & Full-stack Enthusiast

> Fork it, explore it, secure it! 🔒

