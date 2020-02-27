class ProgramPolicy < ApplicationPolicy

    def index?
      user.sai_maa?
    end

    def show?
      user.sai_maa?
    end

    def new?
      create?
    end

    def create?
      user.sai_maa?
    end

    def update?
      create?
    end

    def edit?
      create?
    end

    def destroy?
      update?
    end

end
