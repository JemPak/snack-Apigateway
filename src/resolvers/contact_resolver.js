const contactResolver = {
  Query: {
    getContactById: async (_, { contactId }, { dataSources }) => {
      return await dataSources.contactAPI.getContactById(contactId);
    },
    getAllContactActive: async (_, {}, { dataSources, userIdToken }) => {
      // validate if Query is create by Admin
      if ((await dataSources.authAPI.getUser(userIdToken)).is_admin)
        return await dataSources.contactAPI.getContactActive();
      else return null;
    },
    getContactsByUser: async (
      _,
      { userEmail, active },
      { dataSources, userIdToken }
    ) => {
      if (userEmail == (await dataSources.authAPI.getUser(userIdToken)).email) {
        return await dataSources.contactAPI.getContactByUser(
          userIdToken,
          active
        );
      } else return null;
    },
  },
  Mutation: {
    createContact: async (_, { contact }, { dataSources, userIdToken }) => {
      if (contact.email == (await dataSources.authAPI.getUser(userIdToken)).email) {
        contact.user_id = userIdToken;
        delete contact.email;
        return await dataSources.contactAPI.createContact(contact);
      } else return null;
    },
    updateContact: async (_, { contactId, contact }, { dataSources, userIdToken }) => {
      if (contact.email == (await dataSources.authAPI.getUser(userIdToken)).email) {
        contact.user_id = userIdToken;
        delete contact.email;
        return await dataSources.contactAPI.updateContact(
          contactId,
          contact
        );
      } else return null;
    },
    deleteContact: async (_,{ contactId },{ dataSources, userIdToken}) => {
      const contact = await dataSources.contactAPI.getContactById(contactId);
      // comprobar que la id existe
      if (contact == null) return null;
      // comprobar que el contacto a borrar sea del mismo usuario del token
      if (userIdToken == contact.user_id){
        if (contactId == (await dataSources.contactAPI.getContactById(contactId)).contact_id)
          return await dataSources.contactAPI.deleteContact(contactId);
        else return null;
      }
      else return null;
    },
  },
};

module.exports = contactResolver;