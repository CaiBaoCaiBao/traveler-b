<template>
  <Container>
    <div id="login-container">
      <div id="login-form">
        <!-- 表单头部 -->
        <div id="login-header">
          <h1>Sign In</h1>
          <p class="subtitle">Welcome! Please enter your details</p>
        </div>
        <!-- 表单主体 -->
        <form id="login-body" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">
              <span>Email Address</span>
              <span class="required-mask">*</span>
            </label>
            <input type="email" name="email" id="email" placeholder="Enter your email" class="input-group"
              v-model="form.email" required autocomplete="username" />
          </div>
          <div class="form-group">
            <label for="password">
              <span>Password</span>
              <span class="required-mask">*</span>
            </label>
            <div class="password-input-wrapper">
              <input :type="showPassword ? 'text' : 'password'" name="password" id="password"
                placeholder="Enter your password" class="input-group" v-model="form.password" required
                autocomplete="current-password" />
              <button class="toggle-password" type="button" @click="togglePasswordVisibility"
                aria-label="Toggle password visibility">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                  </path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember" v-model="form.rememberMe" />
              <label for="remember">Remember me</label>
            </div>
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>
          <div class="privacy-agreement">
            <input type="checkbox" id="privacy" v-model="form.agreeToPrivacy" required />
            <label for="privacy">
              I agree to the <a href="#" class="privacy-link">Privacy Policy</a> and
              <a href="#" class="privacy-link">Terms of Service</a>
              <span class="required-mask">*</span>
            </label>
          </div>
          <div class="form-btn">
            <div class="btn-group">
              <button type="submit" class="btn-login" :disabled="!formValid">Sign In</button>
            </div>
            <div class="btn-group">
              <button type="reset" class="btn-reset">Clear</button>
            </div>
          </div>
        </form>
        <!-- 表单尾部 -->
        <div id="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/Container.vue'
import { ref, computed } from 'vue'

interface FormData {
  email: string
  password: string
  rememberMe: boolean
  agreeToPrivacy: boolean
}

const form = ref<FormData>({
  email: '',
  password: '',
  rememberMe: false,
  agreeToPrivacy: false,
})

const showPassword = ref(false)

const formValid = computed(() => {
  return form.value.email && form.value.password && form.value.agreeToPrivacy
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = () => {
  if (formValid.value) {
    // 这里处理登录逻辑
    console.log('Form submitted:', form.value)
  }
}
</script>

<style scoped>
#login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(circle at 10% 20%, rgb(12, 24, 99) 0%, rgb(5, 10, 40) 90%);
}

#login-form {
  padding: 2.5rem;
  border-radius: 1rem;
  background: rgba(15, 20, 80, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

#login-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

#login-header {
  text-align: center;
  margin-bottom: 2rem;
}

#login-header h1 {
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #fff;
  font-size: 1.8rem;
  letter-spacing: 0.5px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 0.95rem;
}

#login-footer {
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

#login-footer a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s;
}

#login-footer a:hover {
  color: #5a67d8;
  text-decoration: underline;
}

#login-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  width: 100%;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.password-input-wrapper {
  position: relative;
}

.input-group {
  width: 90%;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(10, 15, 60, 0.6);
  color: #fff;
  padding-right: 2.5rem;
}

.input-group:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.6);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  background: rgba(10, 15, 70, 0.8);
}

.input-group::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.required-mask {
  color: #ff6b6b;
  margin-left: 4px;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.1);
}

.toggle-password svg {
  pointer-events: none;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remember-me input {
  accent-color: #667eea;
}

.remember-me label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  cursor: pointer;
}

.forgot-password {
  color: #667eea;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.privacy-agreement {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: rgba(10, 15, 60, 0.3);
}

.privacy-agreement input {
  margin-top: 0.2rem;
  accent-color: #667eea;
  flex-shrink: 0;
}

.privacy-agreement label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  cursor: pointer;
  line-height: 1.4;
}

.privacy-link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s;
}

.privacy-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.form-btn {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
}

.btn-group {
  flex: 1;
}

button {
  width: 100%;
  padding: 0.875rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-login {
  background-color: #667eea;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-login:hover:not(:disabled) {
  background-color: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-login:disabled {
  background-color: rgba(102, 126, 234, 0.5);
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-reset {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-reset:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 480px) {
  #login-form {
    padding: 2rem 1.5rem;
  }

  .form-btn {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media (max-width: 330px) {
  .form-options {
    display: inline-block;
  }

  .forgot-password {
    display: block;
    margin-top: 0.5rem;
  }

  .privacy-agreement label {
    font-size: 0.8rem;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#login-form {
  animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.form-group {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
}

.form-group:nth-child(1) {
  animation-delay: 0.2s;
}

.form-group:nth-child(2) {
  animation-delay: 0.3s;
}

.form-options {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out 0.4s forwards;
}

.privacy-agreement {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out 0.5s forwards;
}

.form-btn {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out 0.6s forwards;
}

#login-footer {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out 0.7s forwards;
}
</style>