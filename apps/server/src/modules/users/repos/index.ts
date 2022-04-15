interface IUserRepo {
  exists: (id: string) => Promise<boolean>;
}

const exists: IUserRepo["exists"] = async (id: string) => {
  return true;
};

const userRepo: IUserRepo = {
  exists,
};

export default userRepo;
export type { IUserRepo };
