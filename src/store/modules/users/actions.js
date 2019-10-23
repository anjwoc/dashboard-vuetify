import axios from 'axios'
import { connect } from 'net';
//actions

export default {
    signUp({commit, state}, payload){
        axios.post('http://localhost:3085/user', {
          email: payload.email,
          nickname: payload.nickname,
          password: payload.password,
          aboutme: payload.aboutme,
        })
          .then((res)=>{
            console.log(res);
            commit('setMe', res.data);
          })
          .catch((err)=>{
            console.error(err);
          });
      },
      test_login({commit}, loginObj){
        axios
        .post('https://reqres.in/api/login', loginObj)
        .then((res)=>{
          //성공 시 token
          let token = res.data.token;
          let config = {
            headers: {
              "access-token": token
            }
          }
          axios
            .get('https://reqres.in/api/usres/2', config)
            .then((res)=> {})
            .catch(err=> {})
        })
        .catch(err=>{
          console.log(err);
        });
      },
      logIn({commit, dispatch}, payload){
        axios.post('http://localhost:3085/user/login',{
          email: payload.email,
          password: payload.password,
        },{
          withCredentials: true,
        })
          .then((res)=>{
            commit('setMe', res.data);
          })
          .catch((e)=>{
            console.error(e);
          });
      },
      logOut({commit }){
        axios.post('http://localhost:3085/user/logout',{},{
          withCredentials: true,
        })
          .then((res)=>{
            commit('setMe', null);
          })
          .catch((e)=>{
            console.error(e);
          });
      },
      async loadUser({commit}){
        //로컬 스토리지에 저장된 토큰을 불러온다.
        try{
          const res = await this.$axios.get('/user', {
            withCredentials: true,
          });
          commit('setMe', res.data); 
        }catch(err){
          console.error(err);
        };
      },
      async loadDB_24({commit}, payload){
        try{
          res = await axios.get('http://localhost:3085/sensor/24h',{
            withCredentials: true
          });
          commit('setTwentyFour', res);
        }catch(err){
          console.error(err);
        };
      },
      async totalItem({commit}, payload){
        try{
          res = await axios.get('http://localhost:3085/sensor/24h',{
            withCredentials:true
          });
          commit('setTableItem', res.data);
        }catch(err){
          console.error(err);
        }
      },
      async prevTotalUsage_24({commit}, payload){
        //지난 24시간 총계
        try{
          let mac = [];
          let mA = [];
          res = await axios.get('http://localhost:3085/sensor/sum_24h',{
            withCredentials: true
          })
          .then((res)=>{
            res.forEach((val)=>{
              mac.push(val["mac"]);
              mA.push(val["mA"]);
            });
          })
          .catch(err=>{
            console.error(err);
          });
          commit('setMac', mac);
          commit('setMA', mA);
        }catch(err){
          console.error(err);

        }

      }




}
