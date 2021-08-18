import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';

export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

export const rootUserUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
	static buildUser(attrs: UserProps): User {
		return new User(
			new Attributes<UserProps>(attrs),
			new Eventing(),
			new ApiSync<UserProps>(rootUserUrl)
		);
	}

	static buildUserCollection(): Collection<User, UserProps> {
		return new Collection<User, UserProps>(rootUserUrl, (json: UserProps) =>
			User.buildUser(json)
		);
	}

	setRandomAge(): void {
		const age = Math.round(Math.random() * 100);
		this.set({ age });
	}
}
