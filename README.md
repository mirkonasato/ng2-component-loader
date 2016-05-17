# Angular 2 template/style URLs loader for Webpack

Proof-of-concept Webpack loader to inline Angular 2 template and style URLs.

It transforms

``` typescript
@Component({
  selector: 'my-component',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent { }
```

into

``` typescript
@Component({
  selector: 'my-component',
  template: require('./my.component.html'),
  styles: [require('./my.component.css')]
})
export class MyComponent { }
```

## Limitations

The loader does string replacements using regular expressions, so it's likely
to fail in interesting ways given unexpected inputs.

It currently expects (at most) a single `@Component` decorator in each source file.

Also `styleUrls` (if present) is expected to be an array containing a single string.
