const { ApolloError } = require("apollo-server");
const serverConfig = require("../server");
const fetch = require("node-fetch");

const usersResolver = {
  Query: {
    userDetailById: async (_, { userId }, { dataSources, userIdToken }) => {
      if (userId == userIdToken) {
        return await dataSources.authAPI.getUser(userId);
      }
      else return null;
    },
  },
  Mutation: {
    signUpUser: async (_, { userInput }, { dataSources }) => {
      const authInput = {
        email: userInput.email,
        password: userInput.password,
        name: userInput.name,
        nit: userInput.nit,
      };

      // se registra el usuario y este retorna unos tokens, con estos mismos se
      // buscara la ID con l aque quedo registrada la persona para agregarla a la cuenta
      TokensCredentials = await dataSources.authAPI.createUser(authInput);
      console.log(TokensCredentials);
      const token = TokensCredentials.access;

      try {
        let requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          redirect: "follow",
        };

        let response = await fetch(
          `${serverConfig.auth_api_url}/verifyToken/`,
          requestOptions
        );

        if (response.status != 200) {
          console.log(response);
          throw new ApolloError(
            `SESION INACTIVA - ${401}` + response.status,
            401
          );
        }

        const userId =  (await response.json()).UserId ;

        const accountInput = {
          id_client: userId,
          city: userInput.city,
          ages: userInput.ages,
          phone: userInput.phone,
        };

        await dataSources.accountAPI.createAccount(accountInput);
        return TokensCredentials;
        
      } catch (error) {
        throw new ApolloError(`TOKEN ERROR: ${500}: ${error}`, 500);
      }
    },
    logIn: (_, { credentials }, { dataSources }) =>
      dataSources.authAPI.authRequest(credentials),

    refreshToken: (_, { refresh }, { dataSources }) =>
      dataSources.authAPI.refreshToken(refresh),
  },
};

module.exports = usersResolver;
