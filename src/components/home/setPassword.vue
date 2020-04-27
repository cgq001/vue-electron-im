<template>
    <div class="setPassword">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新密码" prop="pass" size="mini">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass" size="mini">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldpassword" size="mini">
                <el-input v-model="ruleForm.oldpassword"></el-input>
            </el-form-item>
            <el-form-item size="mini">
                <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
          let rg = /^[a-zA-Z0-9_-]{4,16}$/
        if (!rg.test(value)) {
          callback(new Error('密码为字母、数字、下划线'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          oldpassword: ''
        },
        rules: {
          pass: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldpassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            let This = this
            this. JIM.updateSelfPwd({
                 'old_pwd' : this.ruleForm.oldpassword,
                 'new_pwd' : this.ruleForm.pass,
                  'is_md5' : false
               }).onSuccess(function(data) {
                   This.$confirm('密码修改成功,现在去重新登陆?', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        showClose: false,
                        type: 'warning'
                    }).then(() => {
                        // This.JIM.loginOut();
                        This.$router.push('/login')
                    }).catch(() => {
                        // This.JIM.loginOut();
                        This.$router.push('/login')   
                    });
               }).onFail(function(data) {
                  //同上
               });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.setPassword{
    width: 100%;
    height: auto;
}
</style>